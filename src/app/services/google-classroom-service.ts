import { HttpClient, HttpHeaders } from '@angular/common/http';

export class GoogleClassroomService {
    constructor(private http: HttpClient) { }
    createCourse(accessToken: string, course: any): Promise<any> {
        const apiUrl = 'https://classroom.googleapis.com/v1/courses';
        const data = JSON.stringify(course);

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        });
        return this.http.post(apiUrl, data, { headers }).toPromise();
    }
}