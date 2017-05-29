import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import {handleError} from 'app/services/handle-error'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CityService {

    constructor(private http: Http) {}

    /**
     * get all cities (France)
     */
    getAll() {
        return this.http.get('api/cities')
            .map(res => res.json())
            .catch(err => handleError(err));
    }

    /**
     * get one city
     * @param id city's id
     */
    getOne(id: string) {
        return this.http.get('api/city/' + id)
            .map(res => res.json())
            .catch(err => handleError(err));
    }

}
