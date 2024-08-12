import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../services/google-auth-part';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit {
  constructor(private authService: GoogleAuthService) { }


  /* 
    Note-: 
    Tested on - http://localhost:4200 env
    Authorised JavaScript origins - http://localhost:4200
    Authorised redirect URIs - http://localhost:4200/google-auth
  */
  ngOnInit(): void {
    this.authService.initGapiClient();
  }

  async signIn() {
    try {
      const user = await this.authService.signIn();
      console.log('User signed in:', user);
      const token = this.authService.getAccessToken();
      console.log('Access token:', token);
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  }

  signOut(){
    this.authService.signOut()
  }

}
