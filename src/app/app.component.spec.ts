import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {By} from "@angular/platform-browser";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render StudentDisciplineComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const studentDisciplineComponent = fixture.debugElement.query(By.css('app-detention-report-component'));
    expect(studentDisciplineComponent).toBeTruthy();
  });
});
