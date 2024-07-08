import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonTestComponent } from './common-test/common-test.component';


const routes: Routes = [
  { path: 'home', component: CommonTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
