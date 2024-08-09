import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../services/only-token-generation-part';

@Component({
  selector: 'app-root',
  templateUrl: './google-classroom-iframe.component.html',
  styleUrls: ['./google-classroom-iframe.component.css']
})
export class GoogleClassroomIframeComponent implements OnInit {
  constructor(private googleAuthService: GoogleAuthService) { }

  ngOnInit(): void {
    this.googleAuthService.initializeGoogleIdentityServices().then(() => {
      console.log('Google Identity Services initialized.');
    }).catch(error => {
      console.error('Error initializing Google Identity Services:', error);
    });
  }

  signIn(): void {
    this.googleAuthService.signIn().then(() => {
      const accessToken = this.googleAuthService.getAccessToken();
      console.log('Access Token:', accessToken);
    }).catch(error => {
      console.error('Error signing in:', error);
    });
  }

  signOut(): void {
    this.googleAuthService.signOut();
  }
}
