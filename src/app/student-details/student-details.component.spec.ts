import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailsComponent } from './student-details.component';
import {By} from "@angular/platform-browser";

describe('StudentDetailsComponent', () => {
  let component: StudentDetailsComponent;
  let fixture: ComponentFixture<StudentDetailsComponent>;

  const student = {
    firstName: 'firstName',
    lastName: 'lastName',
    id: '111',
    parentPhoneNumber: '555-5555',
    priorViolations: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailsComponent);
    component = fixture.componentInstance;

    component.student = student;
    fixture.detectChanges();
  });

  it('should display student first name and last name in header', () => {
    const header = fixture.debugElement.query(By.css('h2')).nativeElement;
    const expectedText = student.firstName + ' ' + student.lastName;
    expect(header.textContent).toEqual(expectedText);
  });

  it('should display student id', () => {
    const studentId = fixture.debugElement.query(By.css('#studentId')).nativeElement;
    expect(studentId.textContent).toEqual(student.id);
  });

  it('should display student parent phone number', () => {
    const parentPhoneNumber = fixture.debugElement.query(By.css('#parentPhoneNumber')).nativeElement;
    expect(parentPhoneNumber.textContent).toEqual(student.parentPhoneNumber);
  });

  it('should display student id', () => {
    const priorViolations = fixture.debugElement.query(By.css('#priorViolations')).nativeElement;
    expect(priorViolations.textContent).toEqual(student.priorViolations.toString());
  });

  it('should display expel button if student has more than 3 prior violations', () => {
    component.student = {
      ...student,
      priorViolations: 4
    }

    fixture.detectChanges();

    const expelButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(expelButton.textContent).toEqual('EXPEL');
  });

  it('should not display expel button if student has more than 3 prior violations', () => {
    component.student = {
      ...student,
      priorViolations: 0
    }

    fixture.detectChanges();

    const expelButton = fixture.debugElement.query(By.css('button'));
    expect(expelButton).toBeNull();
  });

  it('should call expel function when expel button is clicked', () => {
    component.student = {
      ...student,
      priorViolations: 4
    }

    fixture.detectChanges();

    spyOn(component, 'expel');

    const expelButton = fixture.debugElement.query(By.css('button'));
    expect(expelButton.nativeElement.textContent).toEqual('EXPEL');

    expelButton.nativeElement.click();
    expect(component.expel).toHaveBeenCalled();
  });


});
