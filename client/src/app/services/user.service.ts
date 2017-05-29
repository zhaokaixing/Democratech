import { Injectable } from '@angular/core';
import { Headers, Response, Http } from "@angular/http";
import { BaseUrl } from '../config/auth.config'
import {handleError} from 'app/services/handle-error'

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
            .catch(err => handleError(err));
    }

    getWithKey(key : string , value : string){
        return this.http.get(BaseUrl.API + 'api/user/'+key+'/'+value)
          .map(res => res.json())
          .catch(err => handleError(err));
    }

    getOne(id: string): Observable<User> {
        return this.http.get(BaseUrl.API + 'api/user/'+id)
            .map(res => res.json())
            .catch(err => handleError(err));
    }

    getOneFromField(field: string, value: string): Observable<User> {
        return this.http.get(BaseUrl.API + 'api/user/'+field+'/'+value)
            .map(res => res.json())
            .catch(err => handleError(err));
    }

    userExist(mail: string, callback: (data: boolean) => void): void {
        let user = this.getOneFromField('mail', mail);
        user.subscribe(usr => {
            if (usr) callback(true);
            else callback(false);
        });
    }

    add(user: User): Observable<User> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(BaseUrl.API + 'api/user', JSON.stringify(user), { headers: headers })
            .map(res => res.json())
            .catch(err => handleError(err));
    }

    update(user: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(BaseUrl.API + 'api/user/' + user._id, JSON.stringify(user), { headers: headers })
            .map(res => res.json())
            .catch(err => handleError(err));
    }

    delete(id: String) {
        return this.http.delete(BaseUrl.API + 'api/user/' + id)
            .map(res => res.json())
            .catch(err => handleError(err));
    }
}
