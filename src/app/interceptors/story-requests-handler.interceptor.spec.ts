import { TestBed } from '@angular/core/testing';

import { StoryRequestsHandlerInterceptor } from './story-requests-handler.interceptor';

describe('StoryRequestsHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StoryRequestsHandlerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: StoryRequestsHandlerInterceptor = TestBed.inject(StoryRequestsHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
