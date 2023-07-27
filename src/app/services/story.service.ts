import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(
    private http : HttpClient
  ) { }

  getAllStories() :Observable<any> {
    return this.http.get('/stories').pipe(
      tap((res)=> console.log("Get Stories",JSON.stringify(res))
      )
    )
  }

  addStory(story :any) :Observable<any> {
    const options = new HttpHeaders({'Content-Type':'application/json'})
    story.color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    return this.http.post("/stories",story, {headers : options}).pipe(
      tap((res)=> console.log("Added Story", JSON.stringify(res)))
    )
  }

  getStoriesBySprintPoint(sprintPoint: any) :Observable<any> {
    return this.getAllStories().pipe(
      map((stories) => {
      const storyList = stories.filter((story: any) => story.storyPoint <= sprintPoint)
      console.log("listt",storyList);
      let count = 0;
      storyList.forEach((story :any) => {
        if(count<=sprintPoint){
          count+=story.storyPoint
        }
      }
      )
      console.log("Count",count);
      
       return storyList
      }
      )
    )
  }

}
