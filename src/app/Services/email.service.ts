import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpParams} from '@angular/common/http';
import * as $ from 'jquery';
@Injectable()
export class EmailService {
  apiKey: string;
  urlDev: string;
  urlProd: string;
  constructor(private http: HttpClient) {
    this.apiKey = '_rByuoSNxDRpOLSaplgooA';
    this.urlDev = 'http://localhost/UnchartedRealities/api/email/email.php';
    this.urlProd = '/UnchartedRealities/api/email/email.php';
  }
  sendEmail(data) {
      const url = this.urlProd;
      const headers = new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
      const req = data;
      const response: any = this.http.post(url, data)
      .subscribe((resp) => {
        console.log('Success', resp);
      }, (error) => {
        console.log('Error', error);
      });
  }
}
