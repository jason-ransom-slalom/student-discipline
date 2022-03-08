import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Student} from "./student";

@Injectable({
  providedIn: 'root'
})
export class StudentDisciplineService {

  constructor() { }

  getPunishments(): Observable<string[]> {
    return of(['Detention', 'No Recess', 'Write 3 Page Essay', 'Paddle']);
  }

  getStudents(): Observable<Student[]> {
    return of([
      {firstName: 'Cindy', lastName: 'Lime', id: '345', parentPhoneNumber:'555-5555', priorViolations: 3},
      {firstName: 'Bryan', lastName: 'Kulczycki', id: '547', parentPhoneNumber:'555-2323', priorViolations: 0},
      {firstName: 'Jack', lastName: 'Winston', id: '223', parentPhoneNumber:'555-7878', priorViolations: 1},
      {firstName: 'Kanye', lastName: 'Test', id: '189', parentPhoneNumber:'555-9092', priorViolations: 17},
      {firstName: 'Sarah', lastName: 'Payment', id: '422', parentPhoneNumber:'555-3345', priorViolations: 2}
    ])
  }
}
