// src/app/services/google-api.service.ts
import { Injectable } from '@angular/core';
import { loadGapiInsideDOM, gapi } from 'gapi-script';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { admin_environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private gapiSetup = false;
  private authInstance: gapi.auth2.GoogleAuth;

  constructor(
    private http: HttpClient
  ) { }

  async initGapiClient() {
    if (!this.gapiSetup) {
      await loadGapiInsideDOM();
      await new Promise((resolve) => {
        gapi.load('client:auth2', resolve);
      });

      // gapi.client.init()
      await gapi.client.init({
        apiKey: admin_environment.googleApiKey,
        // clientSecret: admin_environment.googleClientSecret,
        clientId: admin_environment.googleClientId,
        discoveryDocs: [
          'https://classroom.googleapis.com/$discovery/rest?version=v1',
        ],
        scope:
          'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.addons.teacher https://www.googleapis.com/auth/classroom.coursework.me',
      });
      this.authInstance = gapi.auth2.getAuthInstance();
      this.gapiSetup = true;
    }
  }

  // Function to sign in the user
  async signIn(): Promise<gapi.auth2.GoogleUser> {
    if (!this.gapiSetup) {
      await this.initGapiClient();
    }
    return this.authInstance.signIn();
  }

  // Function to get the access token
  getAccessToken() : any {
    if (this.authInstance && this.authInstance.isSignedIn.get()) {
      const currentUser = this.authInstance.currentUser.get();
      return currentUser.getAuthResponse();
    }
    return null;
  }

  // Function to sign out the user
  signOut() {
    if (this.authInstance) {
      this.authInstance.signOut();
    }
  }

  // https://classroom.googleapis.com/v1/courses/711890570262/courseWork/712493912933/addOnAttachments?addOnToken=AJYSKo-OvrqBUC2l27OvTjrPUhNl:1726118566585

  // accessToken: string, courseId: string, itemId: string, addOnAttachment: any, addOnToken: string
  addAddOnAttachment(addonParams) {
    const  {accessToken, courseId, itemId, addOnAttachment, addOnToken} = addonParams
    const url = `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork/${itemId}/addOnAttachments?addOnToken=${addOnToken}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(url, addOnAttachment, { headers }).toPromise();
  }

  async getCourseWork(courseId, courseWorkId, accessToken) {
    const url = `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork/${courseWorkId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      const courseWork = await response.json();
      console.log(courseWork);

      // Check for attachments in the courseWork
      if (courseWork.materials) {
        courseWork.materials.forEach(material => {
          console.log(material);  // Attachments like Google Drive files, YouTube videos, etc.
        });
      }
    } else {
      console.error('Failed to fetch coursework:', response.status);
    }
  }
  
}
