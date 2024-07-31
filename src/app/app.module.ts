import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonTestComponent } from './common-test/common-test.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleClassroomComponent } from './google-classroom/google-classroom.component';

@NgModule({
  declarations: [
    AppComponent,
    CommonTestComponent,
    GoogleClassroomComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
