import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  storyList!: any;
  generatedStoriesList!: any;

  constructor(private http: HttpClient) {}

  getAllStories(): Observable<any> {
    return this.http.get('/stories').pipe(
      tap((res) => (this.storyList = res)),
      catchError(this.handleError)
    );
  }

  //For duplicate story name check
  checkDuplicateStories(storyName: string): Observable<any> {
    return this.getAllStories().pipe(
      map((stories) => {
        const duplicateStoryNames = stories.find(
          (story: any) => story.storyName === storyName
        );
        return duplicateStoryNames;
      })
    );
  }

  addStory(story: any): Observable<any> {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    story.color = '#' + (((1 << 24) * Math.random()) | 0).toString(16);
    return this.http.post('/stories', story, { headers: options }).pipe(
      tap((res) => console.log('Added Story', JSON.stringify(res))),
      catchError(this.handleError)
    );
  }

  getStoriesBySprintPoint(sprintPoint: any): Observable<any> {
    return this.getAllStories().pipe(
      map((stories) => {
        //filterout all the user stories point, which are greater than of the sprint limit
        const storyList = stories.filter(
          (story: any) => story.storyPoint <= sprintPoint
        );

        let totalStoryPointCount = 0;
        let currentTotalCount = 0;

        let storySprintCount = sprintPoint;
        let generatedStories: any[] = [];

        //generating userstories within the given sprint limit
        storyList.forEach((story: any) => {
          if (
            story.storyPoint <= storySprintCount &&
            totalStoryPointCount < storySprintCount
          ) {
            currentTotalCount = totalStoryPointCount + story.storyPoint;
            if (currentTotalCount <= storySprintCount) {
              generatedStories.push(story);
              totalStoryPointCount += story.storyPoint;
            }
          }
        });
        this.generatedStoriesList = generatedStories;
        return generatedStories;
      }),
      catchError(this.handleError)
    );
  }

  removeAllStories(id: any): Observable<any> {
    return this.http.delete(`/stories/${id}`).pipe(
      tap((res) => console.log('Deleted Stories', JSON.stringify(res))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg: any;

    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      /* 
      The backend returned an unsuccessful response code.
      The response body may contain clues as to what went wrong, 
      */
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.status.toString();
    }
    return throwError(() => errMsg);
  }
}
