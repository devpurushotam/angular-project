import {
  Component,
  OnInit,
  HostListener,
  Injectable,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ReloadService } from '../services/reloadService';
import {
  aesEncryptionMethod
} from '../services/encrypt-decrypt-object';
import { frameworkList, filterByName } from '../services/search-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AesService } from '../services/aes-encryption-decryption-fixed-key'
import { SearchEncryptionService } from '../services/content-search-with-encryption'
@Component({
  selector: 'app-silent-auth',
  templateUrl: './silent-auth.component.html',
  styleUrls: ['./silent-auth.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class SilentAuthComponent implements OnInit, OnDestroy {
  @ViewChild('captcha', { static: true }) captchaElement!: ElementRef;
  upperCaseObj = ["igot-health", "cbse/ncert", "cbse", "ncert", "cisce", "nios", "cpd", "ict", "nss", "aas pass (evs)", "craft", "ecce", "evs", "gka", "ict", "tamil(at)", "tamil(bt)", "spcc", "nyks", "nursing", "nep", "manipuri lairik laisu (meetei mayek)", "looking around (evs)", "kannada(bt)", "ircs"];
  titleCaseObj = ["cbse training", "evs part 1", "evs part 2", "ict in education", "nss volunteers"];
  encryptedString: any;
  captchaError: string = '';
  dataObject = {
    "firstname": "Gopal",
    "lastname": "Sharma",
    "emailid": "gopalsharma66@gmail.com",
    "phone": "",
    "userid": "2ba82489-6cfc-4a58-9aeb-8372161b9676",
    "userName": "gopalsharma_n0we",
    "maskedPhone": "",
    "maskedEmail": "go***********@gmail.com",
    "profileUserType": "teacher",
    "profileUserSubType": "",
    "rootOrgName": "DIKSHA Custodian Org",
    "board": "CBSE",
    "medium": "English",
    "class": "Class 12",
    "redirecturl": "https://dev-learning.diksha.gov.in/diksha/diksha_sso.php?token=",
    "userRoles": [
      "PUBLIC"
    ],
    "rootOrgId": "0126684405014528002",
    "experience": "0-10",
    "gender": "Male",
    "state": "Haryana",
    "district": "Kaithal",
    "block": "Kaithal",
    "school": "Gsss Kaithal",
    "code": "06050205612",
    "cluster": "Gsss Kaithal",
    "iat": 1741066454,
    "nbf": 1741066454,
    "exp": 1741070054
  }

  encryptedText: string = 's70PRDsYK4hvUyDs9yBd5xdm9pL7uhfTfPVlJEQ5XNqqnTw/Y79Fg2MlN2lFu3n4r50Sr3nMA37+9LgWMKWEb4VKIACjegXh/caMGziHB1lw2f1gFAtgVXAEz31lAOTm0wbCjEbOh867OamL3Ib0mJYvWexnRtWDzHkXOHLEwCLn+VJ5C2arDazKKntZkr0ySnyZkgNmkuNwEpxzEKsRi2Ts9Ic0IuhZqSmB+ehD8ANIO3vn/Sq7tWIlMmHsInL4XVCYCRV1wmlcxjfkv1xpXVceWesB2flzy+sdQsl/QX8A3xQV44/epAI1/y6UQyoT7nBTBdoTyoTGnFicQYOF7HRbZLVwr1y5LCpgeBzhW7sfXbFwVWa5bClnRC73AE0rCSdHZK1rJpfiF2w0k5ozkeMhd+BgzrLg9aO8EifTd1Pia79oFh0qtIFgRqI9Wwc0pRRTc7hjOwOIAzqkXE5uvHSOqV/O/VpdAegEOcPRBjraUvgHrSqx8TrA9JpADcvpExXwxC8P5xXJUiUAr66YDg+T9ZomA88FBjLcNuExjwSj98FRFGBgz9cfMwugMAqV0B6evQY1KEIz1JP/rqPq5+BlK8GfFFHJA37C8Qt5x7uTtsieg6uf/3tsb25uo8diYGLkXFeRA1AkExB0FwR431N5TMNZCdASI2VrNjLPxt3inUjiMlElMVvWra7Q0T3gpI24Fq1YDiaIir9t9fpjweEzO0wApxe/2mGqKthgLI+Z9peUmLst5xqobfHd2PBI4d0neqVsMr5PdmBEPGZ7xw4oGyJn0/+nSgO/srfX48tgt5ur1QyhQh4/jcEeT+DAULdLQ9AGbS2C46OEulJNFgihB3QCbavyv9vKRar3ArBqpxnp0LThFXqrHGi7u27WpWsA8Ns/p9vPPMo76rBqpEA+9xAxDkfB9cTFK7TAvBKB2/8FnB0hC5wTsxpW8y6deldZAt9cvfU=';
  decryptedText: string = '';
  decryptedObject: any = null;
  constructor(private reloadService: ReloadService,
    public encryptionService: aesEncryptionMethod,
    private http: HttpClient,
    private aesService: AesService,
    private searchEncryptionService: SearchEncryptionService
  ) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  @HostListener('window:beforeunload', ['$event'])

  ngOnInit(): void {
    console.log("getting state", this.formatText("State (Bihar)"));
    console.log("base url", window.location.origin)
    let stateId: any = filterByName("State (Delhi)")
    console.log("State (Delhi)", stateId?.identifier);

    {
      const data = {
        "name": "John Doe",
        "age": 30,
        "city": "New York"
      }

      console.log("inside", data);
    }

    // console.log("data", data);
    this.encrypt();

    setTimeout(() => {
      this.decrypt()
    }, 1000);
  }

  onSubmit(username: string) {
    const recaptchaResponse = (window as any).grecaptcha.getResponse();

    if (!recaptchaResponse) {
      this.captchaError = 'Please complete the reCAPTCHA.';
      return;
    }
    this.http.post('https://dev.oci.diksha.gov.in/validate/recaptcha', {
      username,
      recaptchaResponse
    }).subscribe(
      (res: any) => {
        alert(res.message);
        (window as any).grecaptcha.reset();
      },
      () => {
        this.captchaError = 'CAPTCHA verification failed. Try again.';
      }
    );

  }


  searchCourses(): void {
    const url = 'https://dev.oci.diksha.gov.in/api/content/v1/search?orgdetails=orgName,email';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      request: {
        filters: {
          contentType: ['Course'],
          primaryCategory: ['Course'],
          'batches.enrollmentType': 'open',
          'batches.status': ['1'],
          status: ['Live'],
          se_boards: ['NCERT'],
          se_mediums: ['English'],
          se_gradeLevels: ['Class 1']
        },
        limit: 100,
        sort_by: {
          lastPublishedOn: 'desc'
        },
        fields: [
          'name',
          'appIcon',
          'medium',
          'subject',
          'resourceType',
          'contentType',
          'organisation',
          'topic',
          'mimeType',
          'trackable',
          'gradeLevel',
          'se_boards',
          'se_subjects',
          'se_mediums',
          'se_gradeLevels'
        ],
        mode: 'soft',
        facets: ['channel', 'gradeLevel', 'subject', 'medium'],
        offset: 0
      }
    };

    this.http.post(url, body, { headers })
      .subscribe(
        response => console.log(response),
        error => console.error(error)
      );
  }

  async encrypt() {
    // this.encryptedText = await this.aesService.encryptData(this.dataObject);

    console.log("getting encrypted text", this.encryptedText);
  }


  async decrypt() {
    this.decryptedObject = await this.aesService.decryptData(this.encryptedText);
    console.log("decrypted", this.decryptedObject);
  }

  callApi() {

    const requestParam: any = {
      "url": "content/v1/search",
      "param": {
        "orgdetails": "orgName,email",
        "licenseDetails": "name,description,url"
      },
      "data": {
        "data": "IP9kF+vxq5fO+zhPqLwMGemj/QW+sKFNY8JIpeSRSsxcfbVHNvSsxNz8S9HuRztYcY10MRMcA8xB6wrgtsGR96w0n0qajBFhVAe4yp7s3RRrDf4/kbjogiI4Pymeo+p9CmYbdk/hjUjOkgrFmzN07z2chJ7Hnist5LQTWBgmv70sset65bxUcSfukevY3r4Rq4GZQKXOIQyXSBWHsxdw9aUTj2FiFwzjjlfSz4N0SDFcUZNWP0+zRMmnYKOC5wr3UiAUP6bOJgxnv5HhYMpJnojxDnxGZT/jSfKAsOewL0leYiwl5wJ+GAzefWK5atnYIyQjv258j2LSklHim5m/jXaVr7P3UPnUogPunwFkjPl2QkA7/GFNNRoEikZfojK2LSo/cB6jMEil/z9HLUpke0D4pyEEkT4MSWgxb97bJY7UX78j+skhTo+xNf/UT4t0KYp7YIMyB2vyMLhK5rOjDHafPmc0ChieX8sSoGc48nYCvWlpPyXzQmdqiCtRoy23HP2IJ92ZYyv4P07DUWM4liqYICIGzTktClmuZTwEGldPveuWry+SaGmsfC2yz3nPH7YE8xDO+yq977IcAlQq+IjINo2O3LGRiJlLUxcFbTf6Pa2Mm0BcNzD1XFuPJ6XqC85AAP5baKlt0tGRJqjCQ6wZv/qRM2zxzxgGQeBu6TVwufJXl1wKcCgPO8GcDpAuWHTSIabaB/YY1glesNVjmYVFODSGUgE9x64EodN+t5lmUXvRcsxWjiIDSYw8LmDgPxu1+8og6geE5V3ZU/ohpCqM3PuLfjrWNQo04lHWUGq8LVq6WUkhIwbqtmzg0pYCuIKCfOXAeLEoPwRs2Zd3nR52PMepkaxzK1DUs4Nl1ak85we5IrQSOLH0XJSwJDmQ/ZNzKKiI/2Xv62OfvGWtsazj190EOymwGNp+K26yEXpdp6Oh7ipv1rf3Oca8KNrQYCI0w2pxN8Ct1rznJzNf7kf8ve4O7nusC3kBegkLfSkQ4gBA4Zn++YoH+HqC7TYPf3otpClt7h5dyVsN5zxyEm0xLBhcBKg3wd3HH0tHz/QorJO4kih/mZcZnjZtgvV9nyF8dVLoxgGLtFcPy5tRxQdMpF5XTaDJsnJz+NKIxNkiyWWySI3aR7sRx3dbn7YNbgdtemOytvBKu73ESk1o0lsbZzAUC36r+wWK#&UxI8qgAq2aa/ntnD#&3qMXGsyuKZm4lMaYQDqO4A==#&jmcDteG1llq24AII/GKEUZq9W64VkDG7RIBUjCBKFSE=",
        "isEncryption": true
      },
      "header": {
        "Accept": "application/json",
        "X-Source": "web",
        "ts": "2025-03-04T15:28:12+05:30",
        "X-msgid": "a3b96f80-ee77-c388-133a-a3ef46d6f473",
        "X-Request-ID": "a3b96f80-ee77-c388-133a-a3ef46d6f473",
        "X-App-Version": "5.1.0",
        "X-Session-ID": "k5y1xJWK_1-wZdVG9ipR5EGhYBYG0NPW",
        "X-Device-ID": "d33c77a1845286e69364f84070765957",
        "X-Org-code": "0126684405014528002",
        "X-Channel-Id": "0126684405014528002",
        "X-App-Id": "dev.diksha.portal",
        "X-User-ID": "9746794d-3049-49b8-989b-0f792ab015a7"
      }
    }
    this.searchEncryptionService.encryptSearchAPI(requestParam).subscribe(
      response => {
        console.log('API Response:', response);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  redirectTab() {
    // window.open('http://localhost:4200/google-class-room?token=' + encodeURIComponent("lg4GbttFW6s/Zfv8+nyfBUrz4k4avbwy2jxzpAnAlt3J06zgOcdqoCU8SSVka+fhw6ewL9uRU4R1IOq1GmmiF8x1S635EIaiPMCanElIiCigK5Jt5P4dh84gfJHvpzxWWoNybSbniUhfjBxfIZBg0AkN/HNAzyyrR4N7cAFfLQ6T0sv8lTvdXg9yh2ArZBhixi+adWtDn7vcq+I3UP6wVhTrP9P4A1x/4bmffHiRqtysatD8sMTyUL1uVSaFoXJI5l2433dX961wMfDnaOz1nlw5fHCQYzGslKuEkdLsU0GQuTNsUmnblIDeIVd/q7ap68y31Tvw9sxcZGbcEwC9Lc4REcwGegtPqakk528+U2EkcOJYvwyEOAru/og/VkdLkrqvJtcvRWMUe4x6l2LWLR1vosS9hbOc5gw+TG9RiMmSJTj6nlbNKgTaijd0MMaPjFHhRs50W2Ssu9QB2FXfDhGNs946fnmcB6xq1tLAwQ7xPBnIOe9mnqp3+tpt4WwSlKs57pmePFgZywtwZHb1mRiPt4chfcAOn6jtETIKfrkE0Fp++qdPtokH8HLLJnAvbW0COIfcXzEWSArXSLkwJ6dwlQVzaWRG5TwGxj84F42M5qpFwH4G2s071sK6nfCDPKo2sTCgWsBTAXhGD362AE4Cx7OzbHM+/wilCtxCgxEBVXJqZYWD8u6xK6DtHjw3Z/Ws/v2HCMt8ICb4Ign/QXeGEPIff0gqPVn1N/b0b/7sTXFRBBOGU0hNm6i+AsC7pVZDaBFNhue4UghNbqJ/2gs5VwrzfCJMdSknz1tAmNWZQcYN+ZekW6XebZaMcoT908Ho4PYKE7TL0wxchuJgjFMY7OYIlGofb02Rac2HxED2TqwrpYd1qmNNzfDWPNyYTD5pXxS2Io//EMyNwLf+au0/Me0gPtxCnglXh6whRIrtGkPiNnMZmBexdm8OwUleQDE2vMbNtA=="), '_blank');
    window.open('http://localhost:4200/google-class-room?token=' + "imKjkasqfnsuq1V%2FUvr2T2YQXM%2BfoBnT6OiaFnUaKJ%2FqvU9CCwsOBkkJUBitQBlWJ7b%2BTLABtQa%2Bf%2FhTGnyFgHXzbZoAI2ez5M6DWC9%2FK6M3gWQiex2mNrPiS%2BBdCIUJyC1bry7v%2F5ZNlASv79HdLSgpD8o6R8%2FPNuLpUAg1uLsGrKLYtoeYhTx3gN0KKRKGRcc2qREbvVhE%2BKB6V03n3Y6nhqkcMYi8wjMC9MrqIGAGKnmNbXRKu8WgkbIxRbPDcAA5sHlhxfoMJQ1kh0BmuXUs99tB6eZRHOwKcxYVQSEVB7%2B61ZA42lcXYp7WmwaKBpCkVdfYnvqmT3vvamG6RjUwKTVcO9sTk6moMDGn8WiSRWvHvDdZdj%2FbqBqeRJQ1QXsiEWuUdxC%2Fdly0B%2FRvCaZnqAi8UWIKC6ysUN6h6dj0V2I7QlQDF9zcnVfh1HXDsQdfrTWkn1%2B7mkTvqWG%2BCjri1Egm4fEaJq4mBReuchBCYushvcyTWqwtFc%2Bjrorxg7UBY%2B1lgb3OikBqv%2FbNUGoZFjoV0yz1dxgJ2URExs9qrmuePoG2bJjfLO4BPQCKoVUHU7A35G6Hvp%2FoRbGbD7kI1vYessz0HQ5AA%2F5rxYg%2BftrPt1zfB3zTjufy6SNLE2Vz2OlfUpQDfsUh%2FrBXYSXn3p1lt19SzZKrudawjW7zrj60MyPiZM54Djcg2LZLFUhmawI%2F%2FdRd41jywoulMkIG7SWBEXEesHr503B3aicQ9Hu4Cq3WNWYoDGOUTk3YFSSy5tc4Pv4dnUolseoyKq%2BgL3kaeebue9VClwM0HlB57jLzL22tTT7L0qs9DThgu17z2KHzeffGyt0CGLNE0sb39pGj5uIR7fsk3HnwSDUSmOAqNQ87moIKE%2FWtPSHk6iDwTVlMNaDQg5wB0hTPS59E2YiEYVyCSsxgoDCW0AorVVLDoBI1rDM8%2FmOMuIkDoGvCpCRRJA%3D%3D", '_blank');

  }

  formatText(selectedBoard: any): string {
    if (this.upperCaseObj.includes(selectedBoard.toLowerCase())) {
      return selectedBoard.toUpperCase();
    } else if (this.titleCaseObj.includes(selectedBoard.toLowerCase())) {
      let words = selectedBoard.split(" ");
      return words[0].toUpperCase() + " " + this.toTitleCase(words[1] + " " + (words[2] ?? ""));
    }
    else if (selectedBoard.toLowerCase().startsWith("state") && selectedBoard.includes("(") && selectedBoard.includes(")")) {
      selectedBoard = selectedBoard.replace(/\bState\b|\(|\)/gi, '').trim();
      console.log(selectedBoard, 'selectedBoardState');
      return this.toTitleCase(selectedBoard);
    }
    else if (selectedBoard.toLowerCase().startsWith("ut") && selectedBoard.includes("(") && selectedBoard.includes(")")) {
      selectedBoard = selectedBoard.replace(/\but\b|\(|\)/gi, '').trim();
      if (selectedBoard.toLowerCase() == 'dnh and dd') {
        return 'Dadra & Nagar Haveli & Daman & Diu'
      }
      return this.toTitleCase(selectedBoard);
    }
    else {
      return this.toTitleCase(selectedBoard);
    }
  }

  toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }
}