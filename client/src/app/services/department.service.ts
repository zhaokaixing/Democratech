/**
 * Created by quentinC on 16/03/2017.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseUrl } from "app/config/auth.config";

@Injectable()
export class DepartmentService {

  constructor(private http: Http) {
    console.log('Department Service Initialized...');
  }

  getAll() {
    return this.http.get(BaseUrl.API + 'api/departments')
      .map(res => res.json());
  }

  getDepartment(id:string) {
    return this.http.get(BaseUrl.API + 'api/department/'+id)
      .map(res => res.json());
  }
}
