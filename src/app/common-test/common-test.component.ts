import { Component, OnInit } from '@angular/core';
import {
  userLMSToken
  // getDikshaToken 
} from '../services/api-services';

import {
  EncryptionService
} from '../services/encrypt-decrypt-object';

import { HttpClient } from '@angular/common/http';

// const axios = require('axios');

import axios from 'axios';


@Component({
  selector: 'app-common-test',
  templateUrl: './common-test.component.html',
  styleUrls: ['./common-test.component.css']
})
export class CommonTestComponent implements OnInit {
  token: any;
  userData: any;
  encryptedData: any;
  condition1 = 'student1';
  condition2 = 'teacher';
  condition3 = 'home1';

  constructor(public userLMSToken: userLMSToken, public encryptionService: EncryptionService, private http: HttpClient) { }

  ngOnInit(): void {
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
      "code": "10232820901",
      "redirecturl": "https://learning.diksha.gov.in/diksha/diksha_sso.php"
    }

    // this.encryptionService.generateKey().then((keyValue) => {
    //   this.encryptionService.encryptData(userDataObject, keyValue).then((encryptData) => {
    //     console.log("encryptData", encryptData)

        // this.http.post('https://jenkins.oci.diksha.gov.in/diksha-jwttoken/jwtlmsgenarator', userDataObject)
        //   .subscribe(response => {
        //     console.log('Server response:', response);
        //   });

          this.http.post('https://jenkins.oci.diksha.gov.in/diksha-jwttoken/jwtlmsgenarator', userDataObject).subscribe();
      // });
    // });
  }
}
