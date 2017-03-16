/**
 * Created by quentinC on 09/03/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CityService {
    constructor() {
        console.log('Task Service Initialized...');
    }

    getCities() {
        return this.http.get('/api/cities')
            .map(res => res.json());
    }

    getCity(id) {
        return this.http.get('/api/city/'+id)
            .map(res => res.json());
    }
}
