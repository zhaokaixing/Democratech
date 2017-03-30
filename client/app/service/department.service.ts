/**
 * Created by quentinC on 16/03/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DepartmentService {

    constructor(private  http:Http) {
        console.log('Department Service Initialized...');
    }

    getAll() {
        return this.http.get('/api/departments')
            .map(res => res.json());
    }

    getOne(id:string) {
        return this.http.get('/api/department/'+id)
            .map(res => res.json());
    }
}
