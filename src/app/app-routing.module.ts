import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStoryComponent } from './userStories/add-story/add-story.component';
import { StoryListComponent } from './userStories/story-list/story-list.component';
import { SprintCalculatorComponent } from './sprint/sprint-calculator/sprint-calculator.component';
import { AutoGenerateSprintComponent } from './sprint/auto-generate-sprint/auto-generate-sprint.component';
import { StoryHomeComponent } from './userStories/story-home/story-home.component';


const routes: Routes = [
  {path : '', pathMatch : 'full', redirectTo : '/add-story'},
  {path : 'add-story', component : StoryHomeComponent },
  {path : 'story-list', component : StoryHomeComponent},
  {path : 'sprint-calculator', component : SprintCalculatorComponent},
  {path : 'generated-sprint', component : AutoGenerateSprintComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
