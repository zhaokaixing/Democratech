/**
 * Created by quentinC on 16/03/2017.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {handleError} from 'app/services/handle-error'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BaseUrl } from "app/config/auth.config";

@Injectable()
export class DepartmentService {

  constructor(private http: Http) {}

  /**
   * get all departments
   */
  getAll() {
    return this.http.get(BaseUrl.API + 'api/departments')
      .map(res => res.json())
      .catch(err => handleError(err));
  }

  /**
   * get one department
   * @param id department's id
   */
  getOne(id:string) {
    return this.http.get(BaseUrl.API + 'api/department/'+id)
      .map(res => res.json())
      .catch(err => handleError(err));
  }
}
