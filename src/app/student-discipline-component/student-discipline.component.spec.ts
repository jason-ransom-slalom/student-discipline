import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentDisciplineComponent} from './student-discipline.component';
import {BrowserModule, By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StudentDisciplineService} from "../student-discipline.service";

describe('DetentionReportComponentComponent', () => {
  let component: StudentDisciplineComponent;
  let fixture: ComponentFixture<StudentDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule],
      providers: [StudentDisciplineService],
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

  it('should setup form with correct form controls and initial values', () => {
    const expectedFormValue = {
      firstName: '',
      lastName: '',
      violation: '',
      punishment: ''
    }
    expect(component.form.value).toEqual(expectedFormValue);
  });

  it('should call getPunishments from StudentDisciplineService and set the response in the punishments property', () => {

  });

  it('should render inputs for each form control', () => {
    const studentInput = fixture.debugElement.query(By.css('#student'));
    const violationInput = fixture.debugElement.query(By.css('#violation'));
    const punishmentInput = fixture.debugElement.query(By.css('#punishment'));

    expect(studentInput).toBeTruthy();
    expect(violationInput).toBeTruthy();
    expect(punishmentInput).toBeTruthy();
  });

  it('should bind inputs to correct formControl', () => {
    component.form.get('student')?.patchValue('ross');
    component.form.get('violation')?.patchValue('paint splatter on carpet');
    component.form.get('punishment')?.patchValue('detention');

    fixture.detectChanges();

    const firstNameText = fixture.debugElement.query(By.css('#firstName')).nativeElement.value;
    const lastNameText = fixture.debugElement.query(By.css('#lastName')).nativeElement.value;
    const violationText = fixture.debugElement.query(By.css('#violation')).nativeElement.value;
    const punishmentText = fixture.debugElement.query(By.css('#punishment')).nativeElement.value;

    expect(firstNameText).toBe('bob');
    expect(lastNameText).toBe('ross');
    expect(violationText).toBe('paint splatter on carpet');
    expect(punishmentText).toBe('Detention');
  });
});
