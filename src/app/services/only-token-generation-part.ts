import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private CLIENT_ID = environment.googleClientId;
  private SCOPES = 'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.courseworkmaterials https://www.googleapis.com/auth/classroom.announcements';

  constructor() {}

  initializeGoogleIdentityServices(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: this.CLIENT_ID,
          callback: (response: any) => {
            if (response.credential) {
              resolve();
            } else {
              reject('No credentials found');
            }
          },
          auto_select: false,
          scope: this.SCOPES
        });
        window.google.accounts.id.prompt();
      } else {
        // Add a small delay to ensure script has time to load
        setTimeout(() => {
          if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
              client_id: this.CLIENT_ID,
              callback: (response: any) => {
                if (response.credential) {
                  resolve();
                } else {
                  reject('No credentials found');
                }
              },
              auto_select: false,
              scope: this.SCOPES
            });
            window.google.accounts.id.prompt();
          } else {
            reject('Google Identity Services not loaded');
          }
        }, 1000);
      }
    });
  }

  signIn(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed()) {
            reject('Sign-in widget not displayed');
          } else if (notification.isSkippedMoment()) {
            reject('Sign-in was skipped');
          } else if (notification.isDismissedMoment()) {
            reject('Sign-in was dismissed');
          } else {
            resolve();
          }
        });
      } else {
        reject('Google Identity Services not loaded');
      }
    });
  }

  signOut(): void {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
      window.google.accounts.id.revoke(() => {
        console.log('Signed out');
      });
    }
  }

  getAccessToken(): string | null {
    const response = window.google.accounts.id.get();
    return response ? response.credential : null;
  }
}
