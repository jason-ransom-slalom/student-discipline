import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {StudentDisciplineService} from "../student-discipline.service";
import {Student} from "../student";

@Component({
  selector: 'app-student-discipline',
  templateUrl: './student-discipline.component.html',
  styleUrls: ['./student-discipline.component.css']
})
export class StudentDisciplineComponent implements OnInit {
  selectedStudent: Student;
  punishments: string[];
  students: Student[];

  form = this.formBuilder.group({
    student: ['', Validators.required],
    violation: ['', Validators.required],
    punishment: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private studentDisciplineService: StudentDisciplineService) {
  }

  ngOnInit(): void {
    this.studentDisciplineService.getPunishments().subscribe(response => {
      this.punishments = response;
    });

    this.studentDisciplineService.getStudents().subscribe(response => {
      this.students = response;
    })

    this.form.get('student')?.valueChanges.subscribe(id => {
      this.selectedStudent = this.students.find(student => student.id === id)!
    })
  }

  onSubmit() {
    console.log(this.form.getRawValue());
  }

}
