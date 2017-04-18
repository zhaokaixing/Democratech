/**
 * Created by lelib on 06/04/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OpinionService {

    constructor(private  http:Http) {
        console.log('Opinion Service Initialized...');
    }

    getOpinionProjectUser(idProject:string, idUser:string) {
        return this.http.get('/api/opinion/'+idProject+idUser)
            .map(res => res.json());
    }

    getOpinionProject(idProject:string) {
        return this.http.get('/api/opinion/'+idProject)
            .map(res => res.json());
    }
}
