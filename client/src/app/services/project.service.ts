/**
 * Created by zkx on 30/03/2017.
 */

import {Injectable} from '@angular/core';
import { Headers, Response, Http } from '@angular/http';
import { BaseUrl } from '../config/auth.config'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Project } from "../models/Project";

@Injectable()
export class ProjectService{
    constructor(private http: Http) {
        //console.log('Project Service Initialized...');
    }

    getAll():Observable<Project[]> {
    return this.http.get(BaseUrl.API + 'api/projects')
        .map(res => res.json())
        .catch(err => this.handleError(err));
}

    getOne(id: string): Observable<Project> {
        return this.http.get(BaseUrl.API + 'api/project/' + id)
            .map(res => res.json())
            .catch(err => this.handleError(err));
    }

    add(project: Project): Observable<Project> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(BaseUrl.API + 'api/project', JSON.stringify(project), {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    update(project: Project) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(BaseUrl.API + 'api/project/' + project._id, JSON.stringify(project), {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    delete(id: String) {
        return this.http.delete(BaseUrl.API + 'api/project/' + id)
            .map(res => res.json())
            .catch(this.handleError);
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
