import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GoogleClassroomService {
    private baseUrl = 'https://classroom.googleapis.com/v1';
    constructor(private http: HttpClient) { }

    private authUrl = 'https://accounts.google.com/o/oauth2/auth';
    private redirectUri = encodeURIComponent('http://localhost:4200/google-class-room');
    // const redirectUri = encodeURIComponent('http://localhost:3000/explore/1?id=ncert_k-12&selectedTab=all');
    // const scope = 'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.me';
    // const scope = encodeURIComponent('https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.courseworkmaterials');
    private scopes = [
        'https://www.googleapis.com/auth/classroom.coursework.students',
        'https://www.googleapis.com/auth/classroom.coursework.me',
        'https://www.googleapis.com/auth/classroom.announcements'
    ].join(' ');


    getAuthUrl() {
        const params = new HttpParams()
            .set('client_id', environment.googleClientId)
            .set('redirect_uri', environment.googleRedirectUri)
            .set('response_type', 'code')
            .set('scope', this.scopes)
        //   .set('access_type', 'offline');

        return `${this.authUrl}?${params.toString()}`;
    }

    createCourse(accessToken: string, course: any): Promise<any> {
        const apiUrl = 'https://classroom.googleapis.com/v1/courses';
        const data = JSON.stringify(course);

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        });
        return this.http.post(apiUrl, data, { headers }).toPromise();
    }

    addCourseWorkMaterial(accessToken: string, courseId: string, material: any) {
        const apiUrl = `https://classroom.googleapis.com/v1/courses/${courseId}/courseWorkMaterials`;
        const data = JSON.stringify(material);
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        });

        return this.http.post(apiUrl, data, { headers }).toPromise();
    }

    exchangeCodeForToken(code: string): Promise<any> {
        const clientId = environment.googleClientId;
        const clientSecret = environment.googleClientSecret
        const redirectUri = encodeURIComponent(environment.googleRedirectUri);
        const apiUrl = 'https://oauth2.googleapis.com/token';
        const body = new HttpParams()
            .set('code', code)
            .set('client_id', clientId)
            .set('client_secret', clientSecret)
            .set('redirect_uri', redirectUri)
            .set('grant_type', 'authorization_code');
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return this.http.post(apiUrl, body, { headers }).toPromise();
    }

    // get diksha course details using do-id 

    async getCourseDetails(doId: string): Promise<any> {
        const url = `https://dev.oci.diksha.gov.in/api/course/v1/hierarchy/${doId}?orgdetails=orgName,email&licenseDetails=name,description,url`
        try {
            const response = await this.http.get(url).pipe(first()).toPromise();
            return response;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async createCourseWork(accessToken: string, courseId: string, courseWork: any) {
        const url = `${this.baseUrl}/courses/${courseId}/courseWork`;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        });

        try {
            const response = await this.http.post(url, courseWork, { headers }).pipe(first()).toPromise();
            return response;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async listCourses(accessToken: string) {
        const url = `${this.baseUrl}/courses`;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        });

        try {
            const response = await this.http.get(url, { headers }).pipe(first()).toPromise();
            return response;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async listCourseWork(accessToken: string, courseId: string) {
        const url = `${this.baseUrl}/courses/${courseId}/courseWork`;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        });

        try {
            const response = await this.http.get(url, { headers }).pipe(first()).toPromise();
            return response;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }


    addAddOnAttachment(accessToken: string, courseId: string, courseWorkId: string, addOnAttachment: any) {
        // const url = `${this.baseUrl}/courses/${courseId}/courseWork/${courseWorkId}:addAddOnAttachment`;
        // const url = `${this.baseUrl}/courses/${courseId}/courseWork/${courseWorkId}/attachments:add`;
        const url = `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork/${courseWorkId}/addOnAttachments`
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        });
        return this.http.post(url, addOnAttachment, { headers }).toPromise();  
    }
}