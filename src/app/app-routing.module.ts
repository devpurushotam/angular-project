import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonTestComponent } from './common-test/common-test.component';
import { GoogleClassroomComponent } from './google-classroom/google-classroom.component';
import { GoogleClassroomIframeComponent } from './google-classroom-iframe/google-classroom-iframe.component';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { SilentAuthComponent } from './silent-auth/silent-auth.component';





const routes: Routes = [
  { path: 'home', component: CommonTestComponent },
  { path: 'google-class-room', component: GoogleClassroomComponent },
  { path: 'iframe-test', component: GoogleClassroomIframeComponent },
  { path: 'google-auth', component: GoogleAuthComponent },
  { path: 'silent-auth', component: SilentAuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
