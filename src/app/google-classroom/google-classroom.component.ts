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
  courseDetail: any = {};
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

    let doId = "do_3138963383266672641118";

    this.googleClassroomService.getCourseDetails(doId).then((response: any) => {
      console.log("getting course response ", response?.result?.content);
      let courseData = response?.result?.content;
      this.courseDetail = {
        name: courseData?.name, // done
        section: courseData?.se_gradeLevels[0], // done 
        descriptionHeading: courseData?.description, // done
        room: '104', // need to confirm
        ownerId: 'me', // need to confirm
        courseState: 'ACTIVE', // fixed value
      }

      console.log("courseDetail", this.courseDetail);

      this.googleClassroomService.createCourse(this.token, this.courseDetail)
        .then(response => {
          const courseId = response?.id;
          this.addCourseMaterial(courseId, doId);
          console.log("getting google classroom response", response);
        })
        .catch(error => {
          console.error(error);
        });

    }).catch((error) => {
      console.log(error);
    })
  }


  addCourseMaterial(courseId: string, doId: string) {
    console.log("courseId", courseId)
    const material = {
      title: 'Course Introduction Material',
      materials: [
        {
          link: {
            url: `https://dev.oci.diksha.gov.in/explore-course/course/${doId}`,
            title: this.courseDetail?.name,
          }
        }
      ],
      state: 'PUBLISHED'
    };

    this.googleClassroomService.addCourseWorkMaterial(this.token, courseId, material)
      .then(response => {
        console.log('Material added:', response);
        window.alert(`Course has been added successfully : ${this.courseDetail?.name}`)
      })
      .catch(error => {
        console.error(error);
      });
  }

}
