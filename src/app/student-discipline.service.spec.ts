import { TestBed } from '@angular/core/testing';

import { StudentDisciplineService } from './student-discipline.service';

describe('StudentDisciplineService', () => {
  let service: StudentDisciplineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDisciplineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
