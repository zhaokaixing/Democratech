import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class CityService {

    constructor(private http: Http) {}

    getAll() {
        return this.http.get('api/cities')
            .map(res => res.json());
    }

    getOne(id: string) {
        return this.http.get('api/city/' + id)
            .map(res => res.json());
    }

}
