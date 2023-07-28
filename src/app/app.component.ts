import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'AutomatedScrumSprintPlanner';
  linkVisibility: boolean = false;

  constructor(private router: Router) {}

  //updating the visibility of sprint and story link according to the current url
  ngDoCheck(): void {
    if (this.router.url == '/add-story') {
      this.linkVisibility = true;
    } else this.linkVisibility = false;
  }
}
