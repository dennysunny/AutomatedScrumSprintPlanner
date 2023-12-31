import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryHomeComponent } from './story-home.component';

describe('StoryHomeComponent', () => {
  let component: StoryHomeComponent;
  let fixture: ComponentFixture<StoryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
