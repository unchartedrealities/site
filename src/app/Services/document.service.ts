import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpParams} from '@angular/common/http';
import {Document, documents} from '../DummyData/news&events';
import * as $ from 'jquery';
declare var require: any;

@Injectable()
export class DocumentService {
  private pdfParser;
  private response$;
  urlDev: string;
  urlProd: string;
  constructor(private http: HttpClient) {
    this.urlDev = 'http://localhost/UnchartedRealities/api';
    this.urlProd = '/UnchartedRealities/api';
  }
  getLocalDocs(): Document[] {
    return documents;
  }
  async selectFromNewsDB(dateUBound: any) {
    const url = `${this.urlProd}/actions/getNews.php`;
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
    const data = `date=${dateUBound}`;
    const response: any = await this.http.post( url, data, {headers: headers})
    .toPromise()
    .then(rsp => {
      return rsp;
    });
     return response;
  }
  async getNumRowsNewsDB() {
    const url = `${this.urlProd}/actions/getNumRowsNews.php`;
    const response: any = await this.http.get( url ).toPromise();
    return response;
  }
  async selectFromEventsDB(dateUBound: any) {
    const url = `${this.urlProd}/getEvents.php`;
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
    const data = `date=${dateUBound}`;
    const response: any = await this.http.post( url, data, {headers: headers})
    .toPromise()
    .then(rsp => {
      return rsp;
    });
     return response;
  }
  async getNumRowsEventsDB() {
    const url = `${this.urlProd}/actions/getNumRowsEvents.php`;
    const response: any = await this.http.get( url ).toPromise();
    return response;
  }
}
