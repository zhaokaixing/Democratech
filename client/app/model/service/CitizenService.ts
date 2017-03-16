/**
 * Created by quentinC on 09/03/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CitizenService {
    constructor(private http: Http) {
        console.log('Task Service Initialized...');
    }

    getCities() {
        return this.http.get('/api/citizens')
            .map(res => res.json());
    }

    getCity(id: string) {
        return this.http.get('/api/citizen/'+id)
            .map(res => res.json());
    }
}
