import { Component } from '@angular/core';
// import { AuthService } from './services/auth-service-iframe';
// import { GoogleAuthService } from './services/only-token-generation-part'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  navItems = [
    { name: 'Home', link: '/home' },
    { name: 'G-Classroom', link: '/google-class-room' },
    { name: 'G-Auth', link: '/google-auth' },
    { name: 'G-iframe-Test', link: '/iframe-test' },
    { name: 'G-silent-auth', link: '/silent-auth' }

  ];

  title = 'my-angular-project';

  iframeUrl = "http://localhost:8080"; // Pointing to local HTML file for testing



  constructor(
    // private googleAuthService: GoogleAuthService
  ) { }

  ngOnInit() {
    // this.googleAuthService.initGoogleAuth().then(() => {
    //   console.log('Google API client loaded.');
    // });
  }

  addAttachment() {
    // const authToken = this.authService.getAuthToken();
    const iframeData = this.parseIframeUrl(this.iframeUrl);
    const attachment = {
      // Define your attachment data here
    };

    // console.log("authToken", authToken);

    // this.classroomService.addAttachment(iframeData.courseId, iframeData.itemId, attachment, authToken);
  }

  parseIframeUrl(url: string) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return {
      addOnToken: urlParams.get('addOnToken'),
      courseId: urlParams.get('courseId'),
      postId: urlParams.get('postId'),
      itemId: urlParams.get('itemId'),
      itemType: urlParams.get('itemType'),
      loginHint: urlParams.get('login_hint')
    };
  }

  // signIn() {
  //   this.authService.isAuthenticated$().subscribe(isAuthenticated => {
  //     console.log("isAuthenticated", isAuthenticated)
  //     if (!isAuthenticated) {
  //       this.authService.signIn();
  //     }
  //   });
  // }


  // signIn(): void {
  //   this.googleAuthService.signIn().then(() => {
  //     const token = this.googleAuthService.getToken();
  //     console.log('Access Token:', token);
  //   });
  // }

}
