// src/app/services/google-api.service.ts
import { Injectable } from '@angular/core';
import { loadGapiInsideDOM, gapi } from 'gapi-script';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private gapiSetup = false;
  private authInstance: gapi.auth2.GoogleAuth;

  constructor() {}

  async initGapiClient() {
    if (!this.gapiSetup) {
      await loadGapiInsideDOM();
      await new Promise((resolve) => {
        gapi.load('client:auth2', resolve);
      });
      await gapi.client.init({
        apiKey: environment.googleApiKey,
        clientId: environment.googleClientId,
        discoveryDocs: [
          'https://classroom.googleapis.com/$discovery/rest?version=v1',
        ],
        scope:
          'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.rosters',
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
  getAccessToken(): string | null {
    if (this.authInstance && this.authInstance.isSignedIn.get()) {
      const currentUser = this.authInstance.currentUser.get();
      return currentUser.getAuthResponse().access_token;
    }
    return null;
  }

  // Function to sign out the user
  signOut() {
    if (this.authInstance) {
      this.authInstance.signOut();
    }
  }
}
