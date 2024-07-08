import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class userLMSToken {
    //   private apiUrl = 'https://example.com/api/data';
    private apiUrl = 'https://jenkins.oci.diksha.gov.in/diksha-jwttoken/jwtlmsgenarator';
    constructor(private http: HttpClient) { }
    getToken(payload: any): Observable<any> {
        const { userid, firstname, lastname, emailid, phone } = payload;
        const url = `${this.apiUrl}?userid=${userid}&firstname=${firstname}&lastname=${lastname}&emailid=${emailid}&phone=${phone}`;
        return this.http.get<any>(url);
    }

    // getToken_test(): Observable<any> {
    //     const URL = "https://dev.oci.diksha.gov.in/auth/realms/sunbird/protocol/openid-connect/token";
    //     let headers: HttpHeaders = new HttpHeaders();
    //     headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //     let input = `client_id=ntp-support-tool&username=reportviewer_tn@yopmail.com&grant_type=password&password=&client_secret=7052d78c-7609-4ddd-958c-420b277307bd`;
    //     return this.http.post(URL, input, { headers: headers });
    // }

    async getToken_test(): Promise<any> {
        // const URL = "https://dev.oci.diksha.gov.in/auth/realms/sunbird/protocol/openid-connect/token";
        const URL = 'https://jenkins.oci.diksha.gov.in/diksha-jwttoken/jwtgnerator?name=Purushotam&userexternalID=515160&schoolexternalID=23438110308';
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        const body = new HttpParams()
            .set('client_id', 'ntp-support-tool')
            .set('username', 'reportviewer_tn@yopmail.com')
            .set('grant_type', 'password')
            .set('password', '') // Assuming the password is intentionally left empty
            .set('client_secret', '7052d78c-7609-4ddd-958c-420b277307bd');

        try {
            const response = await this.http.get(URL, { responseType: 'text' }).pipe(first()).toPromise();
            // const response = await this.http.post(URL, body.toString(), {headers, responseType: 'text' }).pipe(first()).toPromise();
            return response;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    getUserLocationData(ids: string[]): Promise<any> {
        const apiUrl = 'https://diksha.gov.in/api/data/v1/location/search';
        const data = JSON.stringify({
            "request": {
                "filters": {
                    "id": ids,
                },
                "sort_by": {
                    "code": "asc"
                },
                "limit": 1000
            }
        });

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkZUJyTmhjY2djNWNzUnh2ZU02Z2JYMWFuVTZxZGZyYiJ9.PggkeMJjWcV4MEy3J5XnizCCd6qcrFSD5y5rron_G9Y'
        });

        return this.http.post(apiUrl, data, { headers }).toPromise();
    }

    getTokenTest(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getToken_test().then((responseData) => {
                console.log("getting dataqqqq...", responseData);
                resolve(responseData);
            }).catch((error) => {
                console.error("Error in getToken_test", error);
                reject(error);
            });
        });
    }



    // encryption and decryption object

    private stringToArrayBuffer(str: string): ArrayBuffer {
        return new TextEncoder().encode(str);
    }

    // Function to convert an ArrayBuffer to a base64 string
    private arrayBufferToBase64(buffer: ArrayBuffer): string {
        const binary = String.fromCharCode(...new Uint8Array(buffer));
        return btoa(binary);
    }

    // Function to convert a base64 string to an ArrayBuffer
    private base64ToArrayBuffer(base64: string): ArrayBuffer {
        const binary = atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
    }

    // Function to generate a crypto key
    async generateKey(): Promise<CryptoKey> {
        return await crypto.subtle.generateKey(
            {
                name: 'AES-GCM',
                length: 256
            },
            true,
            ['encrypt', 'decrypt']
        );
    }

    // Function to encrypt data
    async encryptData(data: any, key: CryptoKey): Promise<any> {
        const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate random IV
        const encodedData = this.stringToArrayBuffer(JSON.stringify(data));
        const encryptedData = await crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            encodedData
        );

        return {
            iv: this.arrayBufferToBase64(iv),
            data: this.arrayBufferToBase64(encryptedData)
        };
    }

    // Function to decrypt data
    async decryptData(encryptedData: any, key: CryptoKey): Promise<any> {
        const iv = this.base64ToArrayBuffer(encryptedData.iv);
        const data = this.base64ToArrayBuffer(encryptedData.data);
        const decryptedData = await crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            data
        );

        const decodedData = new TextDecoder().decode(decryptedData);
        return JSON.parse(decodedData);
    }

}