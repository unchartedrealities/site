import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpParams} from '@angular/common/http';
import * as $ from 'jquery';
@Injectable()
export class EmailService {
  apiKey: string;
  constructor(private http: HttpClient) {
    this.apiKey = '_rByuoSNxDRpOLSaplgooA';
  }
  sendEmailPhp(data) {
      const url = 'http://localhost/UnchartedRealities/api/email/email.php';
      const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
      const req = `data=${data}`;
      const response: any = this.http.post(url, req, {headers : headers})
      .subscribe((resp) => {
        console.log('Email', resp);
      }, (error) => {
        console.log('Email err', error);
      });
  }
  sendEmail(data) {
    $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
          'key': this.apiKey,
          'message': {
            'from_email': data.email,
            'to': [
                {
                  'email': 'info@unchartedrealities.com',
                  'name': 'Uncharted Realities Admin',
                  'type': 'to'
                }
              ],
            'autotext': 'true',
            'subject': data.subject,
            'html': data.html
          }
        },
        success: (response) => {
          console.log('Mandril Response', response);
          alert(`Thank you for contacting our team at Uncharted Realities! \n
          Our team will review your email and get back to you as soon as possible.`);
        },
        error: (error) => {
          console.log('Mandril Error', error);
          alert(`We're sorry, your email could not be sent at this time. \n
          We apologize for the inconvenience`);
        }
      });
  }
}
