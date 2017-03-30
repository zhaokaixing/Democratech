/**
 * Created by quentinC on 09/03/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Citizen} from '../model/Citizen';

@Injectable()
export class CitizenService {
    constructor(private http: Http) {
        console.log('Citizen Service Initialized...');
    }

    getCitizens(): Observable<Citizen[]>  {
        return this.http.get('/api/citizens')
            .map(res => res.json())
            .catch(err => this.handleError(err));
    }

    getCitizen(id: string): Observable<Citizen> {
        return this.http.get('/api/citizen/'+id)
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
