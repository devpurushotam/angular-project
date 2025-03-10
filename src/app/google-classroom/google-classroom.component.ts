// import { Component, OnInit } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { GoogleClassroomService } from '../services/google-classroom-service';
import { GoogleClassroomService } from '../services/google-classroom-service';
import { AesService } from '../services/aes-encryption-decryption-fixed-key'

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
  decryptedObject: any = null;
  tokenData: any;
  constructor(
    private route: ActivatedRoute,
    public googleClassroomService: GoogleClassroomService,
    // public userLMSToken: userLMSToken,
    private aesService: AesService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      this.tokenData =  decodeURIComponent(params['token']); //"Mv/tmHEHW+QdOvaklfC5AUCbAnU4zjT7JZiGujR7nNM7oiiIeo29MUV/oHOgsObCvnDKIeQItw8cvyuPUXDu0SkWmthG4waWmOsNnLgU+BZloWiJZnJWEaGmu4ipjiyxhRMLnbhfD/q8tVlmjH9vVUsOJKev0ZJztzsTVt1OjNZ4Bz0CAavMxBDJxYpeF0a3IKzPyn3hmS9WP1XWoM+Y7JUAvw2I8g4WM0xeKT7ywwAogzc//E+u69Nq1L2IwKsACDjj5zi4iqA+KwrWpMWmZUzmj8KYnaVJoTbXd9YFTGT3bX8ZTARX0OL5hGZYdJdznR8GrNHO50k+0V0Iu+yGg4tUZTlv1+wHyn1Lvyls8WV9m2WyDFSxWddBUZO2wJaVQtugva7QmdJYNgwKh7Y0vN6dMhoFr3GHzbqGZ9V/x7FFNQo8G6ruTrWXvA2s29z7wb/qVlirpMVFvOm5LMrCyagoHxdQ0PWZmN2M12Kvz7uquuqZDyY/p+fJSrY561eI2zb4Qs8iHRYSaodoj1DUYVkhdKPKIVoR4WXWqIitJwv+EuZSOdWxjlibgz4jO8ZhSFZATL8BpfA+LUd7moeAqzPaBLXJRgaAmv3PaJcVHjcK5QO2CPWXhTS91ClGzmh1gFXfEdte68gJDRRCuwRxen3BtWOYWf5Xp7YwM+2oSOh3f9DpRnMB5/yA+8NEU4VHl8UrE/R/9Uns3crrqnGXMQZ0v1fiVGBZ10r9UCkZoH0azGxS7tPo21Jc/2RTRUL9okQgzfzs8b2vAxigJrbQmJb3vW2p7qy7l5mb3JEMmh7rrK/1yHO6JmHl2Ab9be1/TxVu1Upq4z0LJCTWbOv/ywjW5qM5H/7z5sr0tJVk5HN721nl6cWZNfb3YQ3Gk9PVjVOI4H1Ek+QlD2cWiu54cztIm2srcvvBW+T1txutKmvdxFjx+RX7/qRJ1FnWFPdWuSGjl71G/NG1JUAqOe9/0fg7PNPMQQPJ";
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

    // this.route.queryParams.subscribe(params => {
    //   this.tokenData = params['toke']; // Extract 'toke' parameter
    //   console.log('Token:', this.token);
    // });
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

  async decrypt() {
    console.log("decrypt", this.tokenData);
    this.decryptedObject = await this.aesService.decryptData(this.tokenData);
    console.log("decrypted1111", this.decryptedObject);
  }

}
