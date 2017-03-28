/**
 * Created by quentinC on 16/03/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { BaseUrl } from '../auth.config'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Organisation} from "../model/Organisation";

@Injectable()
export class OrganisationService {
    constructor(private http: Http) {
        console.log('Organisation Service Initialized...');
    }

    getOrganisations(): Observable<Organisation[]> {
      return this.http.get(BaseUrl.name + 'api/organisations')
        .map(res => res.json())
        .catch(err => this.handleError(err));
    }

    getOrganisation(id: string): Observable<Organisation> {
      return this.http.get(BaseUrl.name + 'api/organisation/'+id)
          .map(res => res.json())
          .catch(err => this.handleError(err));
    }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    console.log(error);

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
