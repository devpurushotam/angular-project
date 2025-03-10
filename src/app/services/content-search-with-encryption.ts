import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError as observableThrowError, of as observableOf } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export interface RequestEncryptParam {
  url: string;
  data?: any;
  param?: any;
  header?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SearchEncryptionService {
  private baseUrl = 'https://dev.oci.diksha.gov.in';

  constructor(private http: HttpClient) {}

  private getHeader(header?: any): HttpHeaders {
    let headers = new HttpHeaders();
    if (header) {
      Object.keys(header).forEach(key => {
        headers = headers.set(key, header[key]);
      });
    }
    return headers;
  }

  encryptSearchAPI(requestParam: RequestEncryptParam): Observable<any> {
    console.log("base url", window.location.origin)
    const httpOptions = {
      headers: requestParam.header ? this.getHeader(requestParam.header) : this.getHeader(),
      params: requestParam.param ? new HttpParams({ fromObject: requestParam.param }) : undefined
    };

    return this.http.post(this.baseUrl + "/api/" + requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: any) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      })
    );
  }
}
