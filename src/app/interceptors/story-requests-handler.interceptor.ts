import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StoryRequestsHandlerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let baseURL = "http://localhost:3000"

    let storyRequest = request.clone({
      url : baseURL+request.url ,
      
    })
    return next.handle(storyRequest);
  }
}
