import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent{

  defaultColor = "#ebebeb"
  emptyStories! :string;

  constructor(
    private storyService :StoryService
  ){}

  @Input() stories! :any;

  

}
