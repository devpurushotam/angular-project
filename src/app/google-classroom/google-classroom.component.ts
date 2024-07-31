// import { Component, OnInit } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { GoogleClassroomService } from '../services/google-classroom-service';
import { userLMSToken } from '../services/api-services';

@Component({
  selector: 'app-google-classroom',
  templateUrl: './google-classroom.component.html',
  styleUrls: ['./google-classroom.component.css'],
  template: `
    <button (click)="createCourse()">Create Course</button>
  `
})
export class GoogleClassroomComponent implements OnInit {

  private clientId = '872658188174-tf46ui5fe852qae790rpjj7jdbnljbi9.apps.googleusercontent.com';
  private clientSecret = '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';
  private redirectUri = 'http://localhost:4200/google-class-room';

  token: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    // public googleClassroomService: GoogleClassroomService,
    public userLMSToken: userLMSToken,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.exchangeCodeForToken(code);
      }
    });
  }

  exchangeCodeForToken(code: string) {
    const url = 'https://oauth2.googleapis.com/token';
    const body = new HttpParams()
      .set('code', code)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('redirect_uri', this.redirectUri)
      .set('grant_type', 'authorization_code');

    this.http.post(url, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe((response: any) => {
      const accessToken = response.access_token;
      console.log('Access Token:', accessToken);
      this.token = accessToken;
      // Save the token and use it to create courses
      // this.router.navigate(['/google-class-room']);
    }, error => {
      console.error('Error exchanging code for token:', error);
    });
  }

  createCourse() {

    const course = {
      name: 'test 1',
      section: 'Period 4',
      descriptionHeading: 'test course',
      room: '104',
      ownerId: 'me',
      courseState: 'ACTIVE',
    };

    this.userLMSToken.createCourse(this.token, course)
      .then(response => {
        const courseId = response?.id;
        this.addCourseMaterial(courseId);
        console.log("getting google classroom response", response);
        // window.alert("Course added successfully in google class room");
      })
      .catch(error => {
        console.error(error);
      });
  }


  addCourseMaterial(courseId: string) {

    console.log("courseId", courseId)
    const material = {
      title: 'Course Introduction Material',
      materials: [
        {
          link: {
            url: 'https://dev.oci.diksha.gov.in/explore-course/course/do_31313958204219392013486',
            title: 'Course Introduction Video'
          }
        }
      ],
      state: 'PUBLISHED'
    };

    this.userLMSToken.addCourseWorkMaterial(this.token, courseId, material)
      .then(response => {
        console.log('Material added:', response);
      })
      .catch(error => {
        console.error(error);
      });
  }

}
