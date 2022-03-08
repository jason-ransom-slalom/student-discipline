import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StudentDisciplineComponent } from './student-discipline-component/student-discipline.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StudentDisciplineService} from "./student-discipline.service";
import { StudentDetailsComponent } from './student-details/student-details.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentDisciplineComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StudentDisciplineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
