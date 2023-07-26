import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGenerateSprintComponent } from './auto-generate-sprint.component';

describe('AutoGenerateSprintComponent', () => {
  let component: AutoGenerateSprintComponent;
  let fixture: ComponentFixture<AutoGenerateSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoGenerateSprintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoGenerateSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
