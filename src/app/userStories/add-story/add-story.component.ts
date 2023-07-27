import { Component, OnInit, Output } from '@angular/core';
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


  constructor(
    private toastr: ToastrService,
    private formBuilder : FormBuilder,
    private storyService : StoryService
    ) {}

    ngOnInit(): void {
        this.addStoryForm = this.formBuilder.group({
          storyName : ['', {updateOn : 'change', validators : [Validators.required, Validators.minLength(4) ]}],
          storyPoint : ['', {updateOn : 'change', validators : [Validators.required, Validators.minLength(1), Validators.maxLength(2)]}]
        })
    }


  addStory() {

    if(this.addStoryForm.valid){

      this.storyService.checkDuplicateStories(this.addStoryForm.value.storyName).subscribe({
        next: (res) => {this.isStoryExists = res
        console.log("resss",this.isStoryExists);
        },
        error: (err) => this.toastr.warning("Error", err)

      })

      if(!this.isStoryExists){
        console.log("story exisists",this.isStoryExists);
        
        this.storyService.addStory(this.addStoryForm.value).subscribe({
          next: (res) => console.log("Component", res),
          error: (err) => this.toastr.warning("Error", err)
        })
      }else this.duplicateStory = "The Story name already exists"

      
      
    }
  }


}
