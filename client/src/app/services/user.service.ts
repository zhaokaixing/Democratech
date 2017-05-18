import { Injectable } from '@angular/core';
import { Headers, Response, Http } from "@angular/http";
import { BaseUrl } from '../config/auth.config'

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from "app/models/User";

@Injectable()
export class UserService {

  constructor(private http: Http) {
    }

    getAll(): Observable<User[]>  {
        return this.http.get(BaseUrl.API + 'api/users')
            .map(res => res.json())
            .catch(err => this.handleError(err));
    }

    getWithKey(key : string , value : string){
        return this.http.get(BaseUrl.API + 'api/user/'+key+'/'+value)
          .map(res => res.json())
          .catch(err => this.handleError(err));
    }

    getOne(id: string): Observable<User> {
        return this.http.get(BaseUrl.API + 'api/user/'+id)
            .map(res => res.json())
            .catch(err => this.handleError(err));
    }

    add(user: User): Observable<User> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(BaseUrl.API + 'api/user', JSON.stringify(user), { headers: headers })
            .map(res => res.json())
            .catch(err => this.handleError(err));
    }

    update(user: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(BaseUrl.API + 'api/user/' + user._id, JSON.stringify(user), { headers: headers })
            .map(res => res.json())
            .catch(err => this.handleError(err));
    }

    delete(id: String) {
        return this.http.delete(BaseUrl.API + 'api/user/' + id)
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
