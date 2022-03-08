import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentDisciplineComponent} from './student-discipline.component';
import {BrowserModule, By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StudentDisciplineService} from "../student-discipline.service";
import {Student} from "../student";
import {StudentDetailsComponent} from "../student-details/student-details.component";

describe('DetentionReportComponentComponent', () => {
  let component: StudentDisciplineComponent;
  let fixture: ComponentFixture<StudentDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule],
      providers: [StudentDisciplineService],
      declarations: [StudentDisciplineComponent, StudentDetailsComponent]
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
      student: '',
      violation: '',
      punishment: ''
    }
    expect(component.form.value).toEqual(expectedFormValue);
  });

  it('should call getStudents from StudentDisciplineService and set the response in the components students property', () => {

  });

  it('should call getPunishments from StudentDisciplineService and set the response in the punishments property', () => {

  });

  it('should render child component and pass selected student as input', () => {

  });

  it('should disable the submit button if form is invalid', () => {
    component.form.get('violation')?.setValue('');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button'));
    expect(submitButton.nativeElement.disabled).toBe(true);
  });

  it('should enable the submit button if form is valid', () => {
    const student1 = {
      firstName: 'bob',
      lastName: 'ross',
      id: '111',
      parentPhoneNumber: '555-5555',
      priorViolations: 0
    };

    const student2 = {
      firstName: 'cindy',
      lastName: 'waters',
      id: '222',
      parentPhoneNumber: '555-5555',
      priorViolations: 1
    };

    component.students = [student1, student2];
    component.punishments = ['punishment1', 'punishment2'];

    component.form.get('student')?.patchValue('222');
    component.form.get('violation')?.patchValue('paint splatter on carpet');
    component.form.get('punishment')?.patchValue('punishment2');

    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button'));
    expect(submitButton.nativeElement.disabled).toBe(false);
  });

  it('should render inputs for each form control', () => {
    const studentInput = fixture.debugElement.query(By.css('#student'));
    const violationInput = fixture.debugElement.query(By.css('#violation'));
    const punishmentInput = fixture.debugElement.query(By.css('#punishment'));

    expect(studentInput).toBeTruthy();
    expect(violationInput).toBeTruthy();
    expect(punishmentInput).toBeTruthy();
  });

  it('should render options in the student select for each student', () => {
    const student1 = {
      firstName: 'bob',
      lastName: 'ross',
      id: '111',
      parentPhoneNumber: '555-5555',
      priorViolations: 0
    };

    const student2 = {
      firstName: 'cindy',
      lastName: 'waters',
      id: '222',
      parentPhoneNumber: '555-5555',
      priorViolations: 1
    };

    component.students = [student1, student2];
    fixture.detectChanges();

    const studentDropdown = fixture.debugElement.query(By.css('select'));
    const studentOptions = studentDropdown.queryAll(By.css('option'));
    expect(studentOptions.length).toBe(component.students.length);
    expect(studentOptions[0].nativeElement.value).toBe(component.students[0].id);
    expect(studentOptions[0].nativeElement.textContent).toBe(component.students[0].firstName + ' ' + component.students[0].lastName);
    expect(studentOptions[1].nativeElement.value).toBe(component.students[1].id);
    expect(studentOptions[1].nativeElement.textContent).toBe(component.students[1].firstName + ' ' + component.students[1].lastName);
  });

  it('should render options in the punishment select for each punishment', () => {
    const punishments = ['punishment1', 'punishment2'];
    component.punishments = punishments;
    fixture.detectChanges();

    const punishmentDropdown = fixture.debugElement.queryAll(By.css('select'))[1];
    const punishmentOptions = punishmentDropdown.queryAll(By.css('option'));
    expect(punishmentOptions.length).toBe(punishments.length);
    expect(punishmentOptions[0].nativeElement.value).toBe(punishments[0]);
    expect(punishmentOptions[0].nativeElement.textContent).toBe(punishments[0]);
    expect(punishmentOptions[1].nativeElement.value).toBe(punishments[1]);
    expect(punishmentOptions[1].nativeElement.textContent).toBe(punishments[1]);
  });

  it('should bind inputs to correct formControl', () => {
    const student1 = {
      firstName: 'bob',
      lastName: 'ross',
      id: '111',
      parentPhoneNumber: '555-5555',
      priorViolations: 0
    };

    const student2 = {
      firstName: 'cindy',
      lastName: 'waters',
      id: '222',
      parentPhoneNumber: '555-5555',
      priorViolations: 1
    };

    component.students = [student1, student2];
    component.punishments = ['punishment1', 'punishment2'];

    component.form.get('student')?.patchValue('222');
    component.form.get('violation')?.patchValue('paint splatter on carpet');
    component.form.get('punishment')?.patchValue('punishment2');
    fixture.detectChanges();

    const studentText = fixture.debugElement.query(By.css('#student'));
    const violationText = fixture.debugElement.query(By.css('#violation')).nativeElement.value;
    const punishmentText = fixture.debugElement.query(By.css('#punishment')).nativeElement.value;

    expect(studentText.nativeElement.value).toBe('222');
    expect(violationText).toBe('paint splatter on carpet');
    expect(punishmentText).toBe('punishment2');
  });
});
