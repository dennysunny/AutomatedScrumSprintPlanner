import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sprint-home',
  templateUrl: './sprint-home.component.html',
  styleUrls: ['./sprint-home.component.css'],
})
export class SprintHomeComponent {
  sprintPoint!: any;
  deletedStories!: any;

  constructor(
    private storyService: StoryService,
    private toastr: ToastrService
  ) {}

  getSprintPoint(sprintPoint: Number) {
    this.sprintPoint = sprintPoint;
  }

  getSprintDeletedStories(deletedStories: any) {
    this.deletedStories = deletedStories;
  }
}
