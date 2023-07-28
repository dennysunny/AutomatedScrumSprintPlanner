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
         if(res){ 
          if(res.storyName != '' || res.storyName !== null){
            sessionStorage.setItem('storyName', res.storyName)
            console.log("story name from res", res.storyName);
            
          }}
        },
        error: (err) => this.toastr.warning("Error", err)

      })
      //add story to db, only if storyName is new
      if (sessionStorage.getItem('storyName') != this.addStoryForm.value.storyName){
        console.log("story exisists", sessionStorage.getItem('storyName'));
        
        this.storyService.addStory(this.addStoryForm.value).subscribe({
          next: (res) => {
            this.toastr.success("Story Name: " +res.storyName! , "Story Added"),
            this.addStoryNotifyEvent.emit(res)
          },
          error: (err) => this.toastr.warning("Error", err)
        })

        
      } else {
        this.toastr.error("StoryName:" + sessionStorage.getItem('storyName')!, "Story Already Exists",)
        sessionStorage.removeItem("storyName")
        }   
      
    }
  }


}
