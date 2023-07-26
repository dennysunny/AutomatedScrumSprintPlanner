import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit{

  storyList! :any;
  defaultColor = "#ebebeb"

  constructor(
    private storyService :StoryService
  ){}

  ngOnInit(): void {
      this.storyService.getAllStories().subscribe({
        next : (res) => this.storyList = res ? res : [],
        error : (err) => console.log("Error",err)
        
      })
      
  }

  

}
