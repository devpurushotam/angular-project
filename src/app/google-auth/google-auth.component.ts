import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../services/google-auth-part';
import { GoogleClassroomService } from '../services/google-classroom-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit {
  googleClassroomToken: string;
  googleKeysPrams: any;
  isFirstTimeLogin: boolean =  false;
  isLoading: boolean = false;
  constructor(
    private authService: GoogleAuthService,
    private googleClassRoomService: GoogleClassroomService,
    public activatedRoute: ActivatedRoute,
  ) { }


  /* 
    Note-: 
    Tested on - http://localhost:4200 env
    Authorised JavaScript origins - http://localhost:4200
    Authorised redirect URIs - http://localhost:4200/google-auth
  */
  ngOnInit(): void {
    // this.authService.initGapiClient();
    // let hostName = window.location.hostname; // get hostName
    this.activatedRoute.queryParams.subscribe(paramsCode => {
      const addOnToken = paramsCode['addOnToken'];
      if (addOnToken) {
        localStorage.setItem('googleParamsCode', JSON.stringify(paramsCode));
        console.log("paramsCode", paramsCode);
        this.googleKeysPrams = paramsCode;
        this.authService.initGapiClient();
      }else{
        localStorage.removeItem('googleParamsCode');
      }
    });
  }

  async signIn() {
    const accessToken = localStorage.getItem('access_token');
    try {
      if (accessToken) {
        this.isFirstTimeLogin = false;
        console.log("user already signin");
        console.log('Access token from local storage:', accessToken);
        this.addonAttachement('do_31255508756661043215197');
        return;
      }
      this.isFirstTimeLogin = true;
      this.generateToken('do_31255508756661043215197');
    } catch (error) {
      console.log("Error During sgnin", error)
      console.error('Sign-in error:', error);
    }
  }

  signOut() {
    this.authService.signOut()
  }

  addonAttachement(doId: string) {
    const storedParamsCode = JSON.parse(localStorage.getItem('googleParamsCode') || '{}');
    const attachementParams = {
      accessToken: localStorage.getItem('access_token'),
      courseId: storedParamsCode?.courseId,
      itemId: storedParamsCode?.itemId,
      addOnToken: storedParamsCode?.addOnToken,
      addOnAttachment: {
        itemId: storedParamsCode?.itemId,
        id: this.generateId(),
        title: "DikshaTest1",
        teacherViewUri: {
          uri: `https://diksha.gov.in/play/collection/${doId}?contentType=LessonPlan`
        },
        studentViewUri: {
          uri: `https://diksha.gov.in/play/collection/${doId}?contentType=LessonPlan`
        }
      },
    }

    this.isLoading = true;

    console.log("attachementParams", attachementParams);
    // this.authService.addAddOnAttachment(attachementParams)
    // .then(response => {
    //   this.isLoading = false;
    //   console.log('Material added:', response);
    // })
    // .catch(error => {
    //   this.isLoading = false;
    //   console.error("Getting attachement error response", error);
    //   if (error?.error?.error?.code == 401 && error?.error?.error?.status == "UNAUTHENTICATED") {
    //     this.isFirstTimeLogin = true;
    //     this.generateToken(doId);
    //   }
    // });
  }


  generateId(length = 20) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  gettingListOfCourses() {
    this.googleClassRoomService.listCourses(this.googleClassroomToken).then((res) => {
      console.log("getting list", res)
    }).catch((error) => {
      console.log("getting error during fetch list");
    })
  }

  async generateToken(doid){
    try {
      const user = await this.authService.signIn();
      console.log('User signed in:', user);
      const token = this.authService.getAccessToken();
      this.googleClassroomToken = token?.access_token;
      console.log('Access token:', token?.access_token);
      const expiresIn = token?.expires_at; // Token validity duration (in seconds)
      const currentTime = new Date().getTime(); // Current time in milliseconds
      const expiryTime = currentTime + expiresIn * 1000; // Expiry time in milliseconds
      localStorage.setItem('access_token', token?.access_token);
      localStorage.setItem('expiry_time', expiryTime.toString());

      if (this.isFirstTimeLogin) {
        this.addonAttachement(doid);
      }
    } catch (error) {
      console.log("getting error durin sigin")
    }
  }

}
