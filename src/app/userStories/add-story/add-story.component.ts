import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit{

  addStoryForm! : FormGroup
  


  constructor(
    private toastr: ToastrService,
    private formBuilder : FormBuilder,
    private storyService : StoryService
    ) {}

    ngOnInit(): void {
        this.addStoryForm = this.formBuilder.group({
          storyName : ['', {updateOn : 'change', validators : [Validators.required, Validators.minLength(4) ,this.storyDuplicateCheck]}],
          storyPoint : ['', {updateOn : 'change', validators : [Validators.required, Validators.minLength(1), Validators.maxLength(2)]}]
        })
    }

    storyDuplicateCheck(storyName : FormControl){

      let storyNameData = storyName.value

    }

  addStory() {
    if(this.addStoryForm.valid){
      this.storyService.addStory(this.addStoryForm.value).subscribe({
        next : (res) => console.log("Component", res),
        error : (err)=> console.log("Error",err)
        
      })
      
    }
  }


}
