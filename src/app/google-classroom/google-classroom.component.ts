// import { Component, OnInit } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { GoogleClassroomService } from '../services/google-classroom-service';
import { GoogleClassroomService } from '../services/google-classroom-service';

@Component({
  selector: 'app-google-classroom',
  templateUrl: './google-classroom.component.html',
  styleUrls: ['./google-classroom.component.css'],
  template: `
    <button (click)="createCourse()">Create Course</button>
  `
})
export class GoogleClassroomComponent implements OnInit {
  token: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public googleClassroomService: GoogleClassroomService,
    // public userLMSToken: userLMSToken,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.googleClassroomService.exchangeCodeForToken(code)
          .then(tokenResponse => {
            console.log("getting token.............", tokenResponse?.access_token);
            this.token = tokenResponse?.access_token;
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  }


  createCourse() {
    const course = {
      name: 'Course test 1',
      section: 'Class 2',
      descriptionHeading: 'test course',
      room: '104',
      ownerId: 'me',
      courseState: 'ACTIVE',
    };

    this.googleClassroomService.createCourse(this.token, course)
      .then(response => {
        const courseId = response?.id;
        this.addCourseMaterial(courseId);
        console.log("getting google classroom response", response);
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

    this.googleClassroomService.addCourseWorkMaterial(this.token, courseId, material)
      .then(response => {
        console.log('Material added:', response);
      })
      .catch(error => {
        console.error(error);
      });
  }

}
