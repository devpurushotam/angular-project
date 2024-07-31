import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonTestComponent } from './common-test/common-test.component';
import { GoogleClassroomComponent } from './google-classroom/google-classroom.component';


const routes: Routes = [
  { path: 'home', component: CommonTestComponent },
  { path: 'google-class-room', component: GoogleClassroomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
