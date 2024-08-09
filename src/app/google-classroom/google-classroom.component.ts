// import { Component, OnInit } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  courseId: any;
  constructor(
    private route: ActivatedRoute,
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

  getAllCourse() {
    this.googleClassroomService.listCourses(this.token).then((response: any) => {
      console.log("getting google course list ", response?.courses);
      const courseId = response?.courses[0].id

      this.googleClassroomService.listCourseWork(this.token, courseId)
        .then((response: any) => {
          console.log("getting listCourseWork", response);
          const courseWorkId = response?.courseWork[0].id
          // const addOnAttachment = {
          //   'addOnId': 'do_313476037573746688118',
          //   'properties': {
          //     'videoUrl': 'https://diksha.gov.in/play/questionset/do_313476037573746688118',
          //     'title': 'QS_PUBLISH',
          //     'thumbnail': 'https://diksha.gov.in/tenant/ntp/logo.png'
          //   }
          // };

          const addOnAttachment =  {
            
            "teacherViewUri": {
              EmbedUri : {
                "uri" : "https://diksha.gov.in/play/questionset/do_3138391815571865601376"
              }
            },
            // "studentViewUri": {
            //   EmbedUri : {
            //     "uri" : "string"
            //   }
            // },
            // "studentWorkReviewUri": {
            //   object (EmbedUri)
            // },
          }
          

          this.googleClassroomService.addAddOnAttachment(this.token, courseId, courseWorkId, addOnAttachment)
            .then(response => {
              console.log('Material added:', response);
              window.alert(`Course has been added successfully : ${this.courseDetail?.name}`)
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          console.error(error);
        });





    }).catch((error) => {
      console.log(error);
    })
  }


  createCourseWork() {

    const courseWork = {
      title: 'Sample Coursework',
      description: 'This is a sample coursework',
      materials: [
        {
          link: {
            url: 'https://example.com/video',
            title: 'Sample Video'
          }
        }
      ],
      workType: 'ASSIGNMENT',
      state: 'PUBLISHED',
      dueDate: {
        year: 2024,
        month: 8,
        day: 10
      },
      dueTime: {
        hours: 23,
        minutes: 59
      }
    };

    this.googleClassroomService.createCourseWork(this.token, this.courseId, courseWork)
      .then(response => {
        console.log("getting createCourseWork response", response);
      })
      .catch(error => {
        console.error(error);
      });
  }

}
