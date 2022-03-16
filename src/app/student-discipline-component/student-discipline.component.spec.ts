import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StudentDisciplineComponent } from "./student-discipline.component";
import { BrowserModule, By } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StudentDisciplineService } from "../student-discipline.service";
import { Student } from "../student";
import { StudentDetailsComponent } from "../student-details/student-details.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { of } from "rxjs";

describe("DetentionReportComponentComponent", () => {
  let component: StudentDisciplineComponent;
  let fixture: ComponentFixture<StudentDisciplineComponent>;

  // jasmine spy object can be used for mocking
  const studentDisciplineServiceSpy = jasmine.createSpyObj(
    "StudentDisciplineService", // first parameter is the name of the service you want to spy/mock
    ["getStudents"] // second param is a list of the methods you want to mock
  );

  // next you mock the function
  const student1: Student = {
    firstName: "bob",
    lastName: "ross",
    id: "111",
    parentPhoneNumber: "555-5555",
    priorViolations: 0,
  };

  const student2: Student = {
    firstName: "cindy",
    lastName: "waters",
    id: "222",
    parentPhoneNumber: "555-5555",
    priorViolations: 1,
  };

  studentDisciplineServiceSpy.getStudents.and.returnValue(
    of([student1, student2])
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: StudentDisciplineService,
          useValue: studentDisciplineServiceSpy,
        },
      ],
      declarations: [StudentDisciplineComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should setup initial form with correct form controls", () => {
    // component class/stated can be tested
    const expectedFormValue = {
      student: "",
      violation: "",
      punishment: "",
    };

    expect(component.form.value).toEqual(expectedFormValue);
  });

  it("should display student select element", () => {
    // fixture (the rendered component) can be tested via css queries
    const studentSelect = fixture.debugElement.query(By.css("#student"));

    expect(studentSelect).toBeTruthy();
  });

  it("should call getStudents from the StudentDisciplineService and set the response to the components students array property", () => {
    const expectedStudents = [student1, student2];

    expect(component.students).toEqual(expectedStudents);
  });

  it("should display option for each student in the student dropdown", () => {
    // Returns DebugElement which can again be queried (for HTML)
    const studentSelect = fixture.debugElement.query(By.css("#student"));

    const options = studentSelect.queryAll(By.css("option"));
    const expectedString = student1.firstName + " " + student1.lastName;

    expect(options.length).toEqual(2); // 2 students that we hardcoded above.
    expect(options[0].nativeElement.textContent).toEqual(expectedString);
  });
});
