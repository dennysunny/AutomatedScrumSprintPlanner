import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-story-home',
  templateUrl: './story-home.component.html',
  styleUrls: ['./story-home.component.css']
})
export class StoryHomeComponent  implements OnInit{

  storyList! :any;
  errorMessage! :any;

  constructor(
    private storyService : StoryService
  ){}

  ngOnInit(): void {
    this.storyService.getAllStories().subscribe({
      next: (res) => this.storyList = res,
      error: (err) => console.log("Error", err)
    })

  }

}
