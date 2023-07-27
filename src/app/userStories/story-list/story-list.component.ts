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
  emptyStories! :string;

  constructor(
    private storyService :StoryService
  ){}

  ngOnInit(): void {
      this.storyService.getAllStories().subscribe({
        next : (res) => {
          if(res.length == 0 ){
            this.emptyStories = "No Stories Created"
          } else this.storyList = res;
        },
        error : (err) => console.log("Error",err)
        
      })
      
  }

  

}
