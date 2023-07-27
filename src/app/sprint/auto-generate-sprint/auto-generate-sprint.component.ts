import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auto-generate-sprint',
  templateUrl: './auto-generate-sprint.component.html',
  styleUrls: ['./auto-generate-sprint.component.css']
})
export class AutoGenerateSprintComponent {

  sprintForm! :FormGroup;
  constructor(){}

}
