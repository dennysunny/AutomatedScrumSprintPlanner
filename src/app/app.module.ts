import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from '@angular/common/http'
import { StoryRequestsHandlerInterceptor } from './interceptors/story-requests-handler.interceptor'
import { ToastrModule } from 'ngx-toastr';
import { StoryListComponent } from './userStories/story-list/story-list.component';
import { AddStoryComponent } from './userStories/add-story/add-story.component';
import { SprintCalculatorComponent } from './sprint/sprint-calculator/sprint-calculator.component';
import { AutoGenerateSprintComponent } from './sprint/auto-generate-sprint/auto-generate-sprint.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoryHomeComponent } from './userStories/story-home/story-home.component';
import { SprintHomeComponent } from './sprint/sprint-home/sprint-home.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    AddStoryComponent,
    SprintCalculatorComponent,
    AutoGenerateSprintComponent,
    StoryHomeComponent,
    SprintHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS , useClass : StoryRequestsHandlerInterceptor, multi : true},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
