import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoryService } from 'src/app/services/story.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sprint-calculator',
  templateUrl: './sprint-calculator.component.html',
  styleUrls: ['./sprint-calculator.component.css'],
})
export class SprintCalculatorComponent implements OnInit {
  sprintCalculatorForm!: FormGroup;
  storyList!: any;
  generatedStoryList!: any;
  sprintPoint!: any;

  @Output() sprintPointEmitter = new EventEmitter<Number>();
  @Output() deleteStoryNotifyEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private storyService: StoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.sprintCalculatorForm = this.formBuilder.group({
      sprintPoint: [
        '',
        {
          updateOn: 'change',
          validators: [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(2),
          ],
        },
      ],
    });
  }

  loadStories() {
    if (this.sprintCalculatorForm.valid) {
      this.sprintPoint = Number(this.sprintCalculatorForm.value.sprintPoint);
      this.sprintPointEmitter.emit(this.sprintPoint);
    }
  }

  clearAllCreatedStories() {
    let toastShown = false;
    this.storyList = this.storyService.storyList;

    if (this.storyList) {
      this.storyList.forEach((story: any) => {
        this.storyService.removeAllStories(story.id).subscribe({
          next: (res) => {
            if (!toastShown) {
              this.toastr.success('All Stories Deleted');
              toastShown = true;
            }
            this.toastr.success('Story Deleted', res.storyName),
              this.deleteStoryNotifyEvent.emit(res);
          },
          error: (err) => this.toastr.warning('Error', err),
        });
      });
    }
  }

  clearAllSelectedStories() {
    let toastShown = false;
    this.generatedStoryList = this.storyService.generatedStoriesList;

    if (this.generatedStoryList) {
      this.generatedStoryList.forEach((story: any) => {
        this.storyService.removeAllStories(story.id).subscribe({
          next: (res) => {
            if (!toastShown) {
              this.toastr.success('Stories Deleted', res.storyName);
              toastShown = true;
            }
            this.deleteStoryNotifyEvent.emit(res);
            this.sprintCalculatorForm.controls['sprintPoint'].patchValue('');
            this.sprintCalculatorForm.controls['sprintPoint'].setErrors(null);
            this.sprintPoint = 0;
            this.sprintPointEmitter.emit(this.sprintPoint);
          },
          error: (err) => this.toastr.warning('Error', err),
        });
      });
    }
  }
}
