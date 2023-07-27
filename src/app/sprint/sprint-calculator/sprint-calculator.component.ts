import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sprint-calculator',
  templateUrl: './sprint-calculator.component.html',
  styleUrls: ['./sprint-calculator.component.css']
})
export class SprintCalculatorComponent implements OnInit {

  sprintCalculatorForm! :FormGroup;
  @Output() sprintPointEmitter = new EventEmitter<Number>();

  constructor(
    private formBuilder : FormBuilder,

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

}
