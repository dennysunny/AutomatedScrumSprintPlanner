import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoryService } from 'src/app/services/story.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-sprint-calculator',
  templateUrl: './sprint-calculator.component.html',
  styleUrls: ['./sprint-calculator.component.css']
})
export class SprintCalculatorComponent implements OnInit {

  sprintCalculatorForm! :FormGroup;
  storyList! :any;
  generatedStoryList! :any;
  @Output() sprintPointEmitter = new EventEmitter<Number>();
 

  constructor(
    private formBuilder : FormBuilder,
    private storyService :StoryService,
    private toastr : ToastrService
  ){}

  ngOnInit(): void {
      this.sprintCalculatorForm = this.formBuilder.group({
        sprintPoint: ['', { updateOn: 'change', validators: [Validators.required, Validators.minLength(1), Validators.maxLength(2)] }]
      })
  }

  loadStories(){
    if(this.sprintCalculatorForm.valid){
      let sprintPoint = Number(this.sprintCalculatorForm.value.sprintPoint)   
      this.sprintPointEmitter.emit(sprintPoint)
    }
  }

  

  clearAllCreatedStories(){

    this.storyList = this.storyService.storyList;

    if(this.storyList){
      this.storyList.forEach((story: any) => {
        this.storyService.removeAllStories(story.id).subscribe({
          next: (res) => this.toastr.error("Story Deleted", res.storyName),
          error: (err) => this.toastr.warning("Error",err)
        })
      })
    }
  }

  clearAllSelectedStories(){

    this.generatedStoryList = this.storyService.generatedStoriesList;

    if (this.generatedStoryList) {
      this.generatedStoryList.forEach((story: any) => {
        this.storyService.removeAllStories(story.id).subscribe({
          next: (res) => this.toastr.error("Story Deleted", res.storyName),
          error: (err) => this.toastr.warning("Error", err)
        })
      })
    }

  }

}
