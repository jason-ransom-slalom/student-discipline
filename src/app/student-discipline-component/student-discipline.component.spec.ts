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

  const studentDisciplineServiceSpy = jasmine.createSpyObj('StudentDisciplineService', ['getPunishments', 'getStudents']);
  studentDisciplineServiceSpy.getPunishments.and.returnValue(of(['p1', 'p2']));
  studentDisciplineServiceSpy.getStudents.and.returnValue(of([student1, student2]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule],
      providers: [
          {provide: StudentDisciplineService, useValue: studentDisciplineServiceSpy}
      ],
      declarations: [StudentDisciplineComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
    expect(studentDisciplineServiceSpy.getStudents).toHaveBeenCalled();
  });

  it('should call getPunishments from StudentDisciplineService and set the response in the punishments property', () => {
    expect(studentDisciplineServiceSpy.getPunishments).toHaveBeenCalled();
  });

  it('should not render child component if student is selected', () => {
    fixture.detectChanges();
    const studentDetailsComponent = fixture.debugElement.query(By.css('app-student-details'));
    expect(studentDetailsComponent).toBeNull();
  });

  it('should render child component with student input if student is selected', () => {
    component.selectedStudent = student1;
    fixture.detectChanges();

    const studentDetailsComponent = fixture.debugElement.query(By.css('app-student-details'));
    expect(studentDetailsComponent).toBeTruthy();

    //you can only do this with shallow rendering. If you include the child component in the testbed setup, it because an integration test.
    //the test running will display warnings if we do not import the child component or use CUSTOM_ELEMENTS_SCHEMA
    expect(studentDetailsComponent.properties['student']).toBe(component.selectedStudent);
  });

  it('should disable the submit button if form is invalid', () => {
    component.form.get('violation')?.setValue('');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button'));
    expect(submitButton.nativeElement.disabled).toBe(true);
  });

  it('should enable the submit button if form is valid', () => {
    component.students = [student1, student2];
    component.punishments = ['punishment1', 'punishment2'];

    component.form.get('student')?.patchValue('222');
    component.form.get('violation')?.patchValue('paint splatter on carpet');
    component.form.get('punishment')?.patchValue('punishment2');

    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button'));
    expect(submitButton.nativeElement.disabled).toBe(false);
  });

  it('should enable call onSubmit when submit button is clicked', () => {
    spyOn(component, 'onSubmit');
    component.students = [student1, student2];
    component.punishments = ['punishment1', 'punishment2'];

    component.form.get('student')?.patchValue('222');
    component.form.get('violation')?.patchValue('paint splatter on carpet');
    component.form.get('punishment')?.patchValue('punishment2');

    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button'));
    submitButton.nativeElement.click();
    expect(component.onSubmit).toHaveBeenCalled()
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
