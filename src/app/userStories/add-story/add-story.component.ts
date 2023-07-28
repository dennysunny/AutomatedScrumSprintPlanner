import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit{

  addStoryForm! : FormGroup;
  isStoryExists! :any;
  duplicateStory! :string;

  @Output() addStoryNotifyEvent = new EventEmitter<any>();


  constructor(
    private toastr: ToastrService,
    private formBuilder : FormBuilder,
    private storyService : StoryService
    ) {}

    ngOnInit(): void {
        this.addStoryForm = this.formBuilder.group({
          storyName : ['', {updateOn : 'change', validators : [Validators.required, Validators.minLength(4), Validators.maxLength(512) ]}],
          storyPoint : ['', {updateOn : 'change', validators : [Validators.required, Validators.minLength(1), Validators.maxLength(2)]}]
        })
    }




  addStory() {
    
    if(this.addStoryForm.valid){
      console.log("Story name", this.addStoryForm.value.storyName);
      
      this.storyService.checkDuplicateStories(this.addStoryForm.value.storyName).subscribe({
        next: (res) => {
         
          if(res && res.storyName != '' && res.storyName !== null){
            this.toastr.warning('Story Already Exists', res.storyName)
          }
          else{
            this.storyService.addStory(this.addStoryForm.value).subscribe({
              next: (res) => {
                this.toastr.success("Story Name: " + res.storyName!, "Story Added"),
                  this.addStoryNotifyEvent.emit(res)
                this.addStoryForm.controls['storyName'].patchValue('')
                this.addStoryForm.controls['storyPoint'].patchValue('')
                this.addStoryForm.controls['storyName'].setErrors(null);
                this.addStoryForm.controls['storyPoint'].setErrors(null);

              },
              error: (err) => this.toastr.warning("Error", err)
            })
          }
        
        },
        error: (err) => this.toastr.warning("Error", err)

      })
        
      
    }
  }


}
