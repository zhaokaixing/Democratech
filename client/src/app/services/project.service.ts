/**
 * Created by zkx on 30/03/2017.
 */

import {Injectable} from '@angular/core';
import { Headers, Response, Http } from '@angular/http';
import { BaseUrl } from '../config/auth.config'
import {handleError} from 'app/services/handle-error'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Project } from "../models/Project";

@Injectable()
export class ProjectService{
    constructor(private http: Http) {}

  addOffer():Observable<string> {
      var nom;
    return this.http.get(BaseUrl.API + 'api/project/add')
      .map(res => res.toString())
      .catch(err => handleError(err));

  }
    getAll():Observable<Project[]> {
    return this.http.get(BaseUrl.API + 'api/projects')
        .map(res => res.json())
        .catch(err => handleError(err));
    }

    getOne(id: string): Observable<Project> {
        return this.http.get(BaseUrl.API + 'api/project/' + id)
            .map(res => res.json())
            .catch(err => handleError(err));
    }

    add(project: Project): Observable<Project> {
        console.log("Ajout !");
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(BaseUrl.API + 'api/project', JSON.stringify(project), {headers: headers})
            .map(res => res.json())
            .catch(err => handleError(err));
    }

    update(project: Project) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(BaseUrl.API + 'api/project/' + project._id, JSON.stringify(project), {headers: headers})
            .map(res => res.json())
            .catch(err => handleError(err));
    }

    delete(id: String) {
        return this.http.delete(BaseUrl.API + 'api/project/' + id)
            .map(res => res.json())
            .catch(err => handleError(err));
    }

    deleteTender(idProject: String, idTender) {
        return this.http.delete(BaseUrl.API + 'api/project/' + idProject+'/tender/'+idTender)
            .map(res => res.json())
            .catch(err => handleError(err));
    }
}
