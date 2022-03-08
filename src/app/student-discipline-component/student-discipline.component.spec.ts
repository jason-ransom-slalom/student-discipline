import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentDisciplineComponent} from './student-discipline.component';
import {BrowserModule, By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StudentDisciplineService} from "../student-discipline.service";
import {Student} from "../student";
import {StudentDetailsComponent} from "../student-details/student-details.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {of} from "rxjs";

describe('DetentionReportComponentComponent', () => {
  let component: StudentDisciplineComponent;
  let fixture: ComponentFixture<StudentDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule],
      providers: [],
      declarations: [StudentDisciplineComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
