/**
 * Created by zkx on 18/05/2017.
 */
import { Injectable } from '@angular/core';
import { Headers, Response, Http } from "@angular/http";
import { BaseUrl } from '../config/auth.config'

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Mail} from "app/models/Mail"

@Injectable()
export class MailService {

  constructor(private http: Http) {
    console.log('Mail Service Initialized...');
  }

  send(mail: Mail): Observable<Mail> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(BaseUrl.API + 'api/mail', JSON.stringify(mail), { headers: headers })
      .map(res => res.json())
  }

  getMailOK():Observable<Mail>{
    return this.http.get(BaseUrl.API + 'api/mail')
      .map(res => res.json());
  }


}
