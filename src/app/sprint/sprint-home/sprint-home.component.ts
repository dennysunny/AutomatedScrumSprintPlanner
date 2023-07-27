import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-home',
  templateUrl: './sprint-home.component.html',
  styleUrls: ['./sprint-home.component.css']
})
export class SprintHomeComponent {

  sprintPoint!: any

  constructor() { }

  getSprintPoint(sprintPoint: Number) {
    this.sprintPoint = sprintPoint
  }

  
  


}
