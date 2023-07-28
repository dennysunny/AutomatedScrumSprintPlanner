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
          storyName : ['', {updateOn : 'change', validators : [Validators.required, Validators.minLength(4), this.checkDuplictateStory ]}],
          storyPoint : ['', {updateOn : 'change', validators : [Validators.required, Validators.minLength(1), Validators.maxLength(2)]}]
        })
    }

    checkDuplictateStory(storyName :FormControl){
      return storyName ? null : {
       StoryAlreadyAdded : {
        "error" : "Entered Story is Alredy Added to the Database,Please add another story"
       } 
      }
      
      
    }


  addStory() {
    
    if(this.addStoryForm.valid){

      this.storyService.checkDuplicateStories(this.addStoryForm.value.storyName).subscribe({
        next: (res) => {
          if(res.storyName != '' || res.storyName !== null){
            sessionStorage.setItem('storyName', res.storyName)
          }
        },
        error: (err) => this.toastr.warning("Error", err)

      })
      //add story to db, only if isStoryExists is null
      if(sessionStorage.getItem('storyName')){
        console.log("story exisists", sessionStorage.getItem('storyName'));
        
        this.storyService.addStory(this.addStoryForm.value).subscribe({
          next: (res) => console.log("Component", res),
          error: (err) => this.toastr.warning("Error", err)
        })
      }else this.duplicateStory = "The Story name already exists"

      
      
    }
  }


}
