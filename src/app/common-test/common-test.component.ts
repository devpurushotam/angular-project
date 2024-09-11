import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  userLMSToken
  // getDikshaToken 
} from '../services/api-services';

import {
  EncryptionService
} from '../services/encrypt-decrypt-object';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// const axios = require('axios');

import axios from 'axios';

import { PopupService } from '../services/shared-service'



@Component({
  selector: 'app-common-test',
  templateUrl: './common-test.component.html',
  styleUrls: ['./common-test.component.css', './style.scss']
})
export class CommonTestComponent implements OnInit {
  token: any;
  userData: any;
  encryptedData: any;
  condition1 = 'student1';
  condition2 = 'teacher';
  condition3 = 'home1';
  stateLogo = "https://dev.oci.diksha.gov.in/tenant/br/logo.png";
  tenantInfo: any = {};
  currentUrl: string;
  showPopup = false;

  financialYearRange = '24-25';
  totalCourseDuration = 16.44444;

 

    otherCertificates = [
      {
        id: '1-c967376f-b053-4bde-9b65-94670e4d3ad7',
        trainingName: 'Coursecbse',
        issuerName: 'cbse',
        issuedOn: '2024-05-20T10:59:20.583Z',
        courseId: 'do_31405684650717184016',
        templateUrl: 'https://obj.vdn.diksha.gov.in/dev-contents-storage/content/do_3135863154501632001905/artifact/do_3135863154501632001905_1658485773442_certificate_2022-07-22_15_59.svg',
        type: 'rc_certificate_registry',
        courseDuration: null,
        courseCredit: null
      },
      {
        id: '1-2c40ad01-757e-4be7-8357-c25a64968b15',
        trainingName: 'new course create',
        issuerName: 'ncert',
        issuedOn: '2024-05-08T10:00:28.857Z',
        courseId: 'do_31404924788734361614',
        templateUrl: 'https://obj.vdn.diksha.gov.in/dev-contents-storage/content/do_314039880557756416195/artifact/do_314039880557756416195_1713852607301_certificate_2024-04-23_11_40.svg',
        type: 'rc_certificate_registry',
        courseDuration: null,
        courseCredit: null
      },
      {
        id: '1-22786f51-7428-4b23-8d68-ab182a373775',
        trainingName: 'course duration new dev',
        issuerName: 'ncert',
        issuedOn: '2024-08-20T05:09:04.085Z',
        courseId: 'do_314124067548905472119',
        templateUrl: 'https://files.odev.oci.diksha.gov.in/dev-contents-storage/content/do_314121423417655296111/artifact/do_314121423417655296111_1723806570198_certificate_2024-08-16_16_39.svg',
        type: 'rc_certificate_registry',
        courseDuration: '8.3333',
        courseCredit: '0.5'
      },
      {
        id: '1-5f4688cd-a385-4405-aa37-04ee93244042',
        trainingName: 'new course create',
        issuerName: 'ncert',
        issuedOn: '2024-05-24T09:50:36.181Z',
        courseId: 'do_31406192208792780812',
        templateUrl: 'https://obj.vdn.diksha.gov.in/dev-contents-storage/content/do_314039869032939520190/artifact/do_314039869032939520190_1713851200589_certificate_2024-04-23_11_16.svg',
        type: 'rc_certificate_registry',
        courseDuration: null,
        courseCredit: null
      },
      {
        id: '1-b9603406-8081-4ac7-86b1-317edec6150c',
        trainingName: 'duration ncert',
        issuerName: 'ncert',
        issuedOn: '2024-08-19T05:07:31.690Z',
        courseId: 'do_31412336323853516814',
        templateUrl: 'https://files.odev.oci.diksha.gov.in/dev-contents-storage/content/do_31402501516898304019/artifact/do_31402501516898304019_1712037985317_certificate_2024-04-02_11_36.svg',
        type: 'rc_certificate_registry',
        courseDuration: '8.5555',
        courseCredit: null
      },
      {
        id: '1-f98d3815-01aa-4b4b-99a8-e2f4c0764c06',
        trainingName: 'dev course',
        issuerName: 'ncert',
        issuedOn: '2024-05-22T05:36:46.085Z',
        courseId: 'do_31406038672761651219',
        templateUrl: 'https://obj.vdn.diksha.gov.in/dev-contents-storage/content/do_314039880557756416195/artifact/do_314039880557756416195_1713852607301_certificate_2024-04-23_11_40.svg',
        type: 'rc_certificate_registry',
        courseDuration: null,
        courseCredit: null
      },
      {
        id: '1-ce97724b-a5be-48da-95a0-541913612d4b',
        trainingName: 'new course 21',
        issuerName: 'ncert',
        issuedOn: '2024-05-21T05:19:58.851Z',
        courseId: 'do_31405966948160307211',
        templateUrl: 'https://obj.vdn.diksha.gov.in/dev-contents-storage/content/do_314039880557756416195/artifact/do_314039880557756416195_1713852607301_certificate_2024-04-23_11_40.svg',
        type: 'rc_certificate_registry',
        courseDuration: null,
        courseCredit: null
      }
    ]


course_duration = [];
course_credit = [];

  src = "https://www.google.com"
  isShowGoogleCLassAddButton: boolean = false;

  gcRedirectURI = "https://dev.oci.diksha.gov.in/explore/1?id=ncert_k-12&selectedTab=all&addOnToken=AKCT2-mIlOZH6q87MGUCqowIMjlj:1722249049050&courseId=701756465924&postId=701754031095&itemId=701754031095&itemType=courseWork&login_hint=114219037756322445346"



  constructor(
    public userLMSToken: userLMSToken,
    public encryptionService: EncryptionService,
    private popupService: PopupService,
    private http: HttpClient) { }

  mainLogo: string;
  showMainLogo: boolean = true;

  ngOnInit(): void {

    // this.result.content.map((contentData)=>{
    //     console.log(contentData.courseCredit);

    //     this.courseDuration.push(contentData.courseDuration);
    //     this.courseCredit.push(contentData.courseCredit)
    // })

    console.log('387---', this.course_credit, this.course_duration);

    this.tenantInfo.logo = "https://dev.oci.diksha.gov.in/tenant/br/logo.png";
    console.log('Current URL:', window.location.href);
    this.getLolo();

    // let url = "https://dev.oci.diksha.gov.in/br/explore?board=State%20(Bihar)&medium=Hindi&gradeLevel=Class%202&&id=br_k-12&selectedTab=home";
    let url = "https://diksha.gov.in/br/explore?board=State%20(Bihar)&medium=Bengali&gradeLevel=Class%202&&id=br_k-12&selectedTab=home";

    let ekstepUrl = "https://diksha.gov.in/resources?board=CBSE&medium=English&gradeLevel=Class%204&id=ekstep_ncert_k-12&selectedTab=home"



    if (url.includes('dev.oci.diksha.gov.in')) { // dev.oci.diksha.gov.in
      this.mainLogo = 'https://dev.oci.diksha.gov.in/tenant/ntp/logo.png';
    } else if (url.includes('diksha.gov.in')) { // diksha.gov.in
      this.mainLogo = 'https://diksha.gov.in/tenant/ntp/logo.png';
    }

    if (this.gcRedirectURI.includes('addOnToken')) {
      this.isShowGoogleCLassAddButton = true
    }



    console.log("mainLogo", this.mainLogo)
  }


  navigateToLMSWeb() {
    const apiUrl = 'https://jenkins.oci.diksha.gov.in/diksha-jwttoken/jwtlmsgenarator_dev';
    // const url = `${apiUrl}?userid=${userData.userid}&firstname=${userData.firstname}&lastname=${userData.lastname}&emailid=${userData.emailid}&phone=${userData.phone}`;
    // // window.location.href = url; // same tab

    let userData = {
      "firstname": "Purushotam Kumar",
      "lastname": null,
      "emailid": "purushotamfntest@yopmail.com",
      "phone": "",
      "userid": "2f47892e-0de1-409e-8b05-4f5d9db18278",
      "profileUserType": "student",
      "rootOrgName": "DIKSHA Custodian Org",
      "board": "CBSE",
      "medium": "English",
      "class": "Class 2",
      "state": "Bihar",
      "district": "Banka",
      "block": "BELHAR",
      "cluster": "M.S. BELHAR",
      "school": "N.P.S. JHUNKA",
      "code": "10232820901"
    }


    this.userLMSToken.generateKey().then((key) => {
      console.log("data", key)
      this.userLMSToken.encryptData(userData, key).then((encryptedData) => {
        console.log("encryptedData", encryptedData)
        const url = `${apiUrl}?data=${encryptedData}`;
        console.log("url", url)


        this.userLMSToken.decryptData(encryptedData, key).then((decryptData) => {
          console.log('decryptData Data:', decryptData);
        });
      })
    });



    // this.encryptedData = await this.encryptionService.encryptData(userDataObject, key);
    // console.log('Encrypted Data:', this.encryptedData);


    // const encodeQueryData = (data) => {
    //   return Object.keys(data)
    //     .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    //     .join('&');
    // };

    // const queryString = encodeQueryData(userData);
    // const url = `${apiUrl}?${queryString}`;
    // window.open(url, '_blank'); // new tab
  }

  async openWebview() {
    let token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhaE41YnpBQl95eDgzVTZBNlFZOFeyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhaE41YnpBQl95eDgzVTZBNlFZOF9XcjFkUWpJSzJ2d0FvUmQ2M0Y2T05ZIn0.eyJqdGkiOiI1YjcxYjNhNy1hYWRkLTRmN2QtYjZiOS01ODBiNTY5OWUxOTgiLCJleHAiOjE3MDg4MTM1NTEsIm5iZiI6MCwiaWF0IjoxNzA4NzcwMzUxLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0L2F1dGgvcmVhbG1zL3N1bmJpcmQiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNWY4OGFmNzYtMGJmZi00YWRiLTgzYzEtZTYwMDIwNTYzN2I4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibmlzaHRoYS1kYXNoYm9hcmQiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJhMjVlZDFlYy04MWJkLTQzYTEtYWIyMi1kZTc0MGUwNDdmMWMiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJNYWhlc2ggS3Jpc2huYWlhaCIsInByZWZlcnJlZF91c2VybmFtZSI6Im5pc2h0aGEtdXNlciIsImdpdmVuX25hbWUiOiJNYWhlc2giLCJmYW1pbHlfbmFtZSI6IktyaXNobmFpYWgiLCJlbWFpbCI6Im1haGVzaC5rcmlzaG5haWFoQHRyaWd5bi5jb20ifQ.YliXhd1Ns3-GRuWjsCTXEcQxuAgLHJFXPxoaMiNVPtkGDmAcZ84eSPZkRar3lpiNiSrr7Fp_rh2W7EvH0Xna8iAa7pVk2nEHvL2yihyI6DhuK8RzjfJK-_xZWC-adJtwwBdJApCw1tXBqKXrZH_B0tYSZ_V-AsYzajlNyFsSFpTYSLO4nJ8xEraDt3O6MqnHwKeyDRRnAF-M3x3soOV3gk_GDJaHcfKedZAok1GeqfJbEQ0YW_boaL4TShi1FH9TxR3t3LmAmdiImhBVdDcoaBfN_eXbS8IaaTvMn9Rg1LF3LUHAxlq-k3w-_gjs0A-l_TVVnlELw1axm8jQPRCMPg';
    if (true) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://jenkins.oci.diksha.gov.in/diksha-jwttoken/jwtgnerator?name=Purushotam&userexternalID=515160&schoolexternalID=23438110308',
        headers: {}
      };

      try {
        let data = await axios.request(config)
        console.log("data...", data.data)
        token = data.data;
      } catch (error) {
      }
    }
    console.log("token...", token)
  }


  getToken() {
    this.userLMSToken.getTokenTest().then((data: any) => {
      console.log("ddddddddddddddd", data);
    }).catch((error) => {
      console.log(error);
    })
  }

  getLolo() {
    this.userLMSToken.getLogo('ekstep').then((response: any) => {
      console.log("getting logo response ", response?.result?.appLogo);

      if (response?.result?.appLogo == "https://diksha.gov.in/tenant/ekstep/appLogo.png") {
        console.log("ekstep url detected");
        this.showMainLogo = false
      }

    }).catch((error) => {
      console.log(error);
    })
  }



  getUserLOcationData() {
    let id = [
      "45f1a47e-4818-478f-bdec-1f7c29b968ba",
      "729f5037-40a7-4560-85bd-8e412264cc43",
      "29e89a81-8503-4d75-a6a3-56964842c0df",
      "1c39fda0-3959-416c-bf62-b9108c081ca8",
      "645c54a4-6b75-4b77-8978-31aa489b638c"
    ]
    this.userLMSToken.getUserLocationData(id)
      .then(data => {
        this.userData = data;
        console.log("getting user Data", this?.userData?.result?.response);

        const createLocationObject = (locations: any) => {
          return locations?.reduce((acc: any, location: any) => {
            acc[location.type] = location.name;
            if (location.type === 'school') {
              acc.code = location.code;
            }
            return acc;
          }, {});
        };

        console.log("this?.userData?.result?.response", this?.userData?.result?.response)
        const locationObject = createLocationObject(this?.userData?.result?.response);
        console.log("locationObject", locationObject);
      })
      .catch(error => {
        console.error(error);
      });

  }

  testDivButton() {
    alert("calling");
  }

  callReadAPI() {
    this.userLMSToken.dikshaReadApi()
      .then(data => {
        console.log("data", data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  sendEncryptedData() {

    let userDataObject = {
      "firstname": "Purushotam Kumar",
      "lastname": null,
      "emailid": "purushotamfntest@yopmail.com",
      "phone": "",
      "userid": "2f47892e-0de1-409e-8b05-4f5d9db18278",
      "profileUserType": "student",
      "rootOrgName": "DIKSHA Custodian Org",
      "board": "CBSE",
      "medium": "English",
      "class": "Class 2",
      "state": "Bihar",
      "district": "Banka",
      "block": "BELHAR",
      "cluster": "M.S. BELHAR",
      "school": "N.P.S. JHUNKA",
      "code": "10232820901"
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post('http://localhost:4000/users/redirectToLMS', userDataObject, { headers })
      .subscribe(response => {
        console.log('Server response:', response);
      });
  }

  callAPI(event: Event) {
    event.stopPropagation(); // Prevents the event from bubbling up to the parent
    window.open(this.src, '_blank'); // new tab
  }

  googleRedirect() {
    const clientId = '872658188174-tf46ui5fe852qae790rpjj7jdbnljbi9.apps.googleusercontent.com';
    const redirectUri = encodeURIComponent('http://localhost:4200/google-class-room'); // https://dev.oci.diksha.gov.in/explore/1?id=ekstep_ncert_k-12&selectedTab=all
    // const scope = 'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.me';
    const scope = encodeURIComponent('https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.courseworkmaterials');

    const scopes = [
      'https://www.googleapis.com/auth/classroom.coursework.students',
      'https://www.googleapis.com/auth/classroom.announcements',
      'https://www.googleapis.com/auth/classroom.courses',
      'https://www.googleapis.com/auth/classroom.coursework.me',
      'https://www.googleapis.com/auth/classroom.courseworkmaterials'
    ].join(' ');

    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;
    window.location.href = authUrl;
  }

  closePopup() {
    this.showPopup = false;  // Handle closing the popup
  }

  openPopup() {
    this.popupService.openPopup();  // Open the popup via the service
  }
  
}
