/**
 * Created by lelib on 06/04/2017.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, Response} from '@angular/http';
import { BaseUrl } from '../config/auth.config'
import { Observable } from 'rxjs/Observable';
import {handleError} from 'app/services/handle-error'

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Opinion } from "app/models/Opinion";

@Injectable()
export class OpinionService {
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private  http: Http) {}

  getOne(userId: string, projectId: string): Observable<Opinion>{
    return this.http.get(BaseUrl.API + 'api/opinion/' + projectId + '/' + userId)
      .map(res => res.json())
      .catch(err => handleError(err));
  }

  add(opinion: Opinion): Observable<Opinion> {
    return this.http.post(BaseUrl.API + 'api/opinion', JSON.stringify(opinion), { headers: this.headers })
      .map(res => res.json())
      .catch(err => handleError(err));
  }

  update(opinion: Opinion): Observable<Opinion> {
    return this.http.put(BaseUrl.API + 'api/opinion/' + opinion._id, JSON.stringify(opinion), {headers: this.headers})
      .map(res => res.json())
      .catch(err => handleError(err));
  }

  remove(id: string){
    return this.http.delete(BaseUrl.API + 'api/opinion/' + id)
      .map(res => res.json())
      .catch(err => handleError(err));
  }

  getVotesCount(projectId:string, vote:number): Observable<number>{
    return this.http.get(BaseUrl.API + 'api/opinion/count/' + projectId + '/' + vote)
      .map(res => res.json())
      .catch(err => handleError(err));
    }
}
