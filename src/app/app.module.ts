import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonTestComponent } from './common-test/common-test.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleClassroomComponent } from './google-classroom/google-classroom.component';
import { GoogleClassroomIframeComponent } from './google-classroom-iframe/google-classroom-iframe.component';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { SilentAuthComponent } from './silent-auth/silent-auth.component';
import { PopupComponent } from './popup/popup.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    CommonTestComponent,
    GoogleClassroomComponent,
    GoogleClassroomIframeComponent,
    GoogleAuthComponent,
    SilentAuthComponent,
    PopupComponent,
    LoaderComponent
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
