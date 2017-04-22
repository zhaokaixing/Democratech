/**
 * Created by lelib on 06/04/2017.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, Response} from '@angular/http';
import { BaseUrl } from '../auth.config'

@Injectable()
export class OpinionService {

    url:string;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private  http:Http) {
    }

    /*getOpinionProjectUser(idProject:string, idUser:string) {
        return this.http.get('/api/opinion/'+idProject+"?"+idUser)
            .map(res => res.json());
    }*/

    // 0=J'aime
    //1= Je n'aime pas
    vote(opinion:number,mail:string, projectId:string):Promise<number>{
        this.url = BaseUrl.name +'api/opinion';
        return this.http
            .post(this.url, { projectId,mail,opinion}, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as number )
            .catch(this.handleError);
    }
    //0= pas de vote
    //1= vote pour
    //2=vote contre
    alreadyVote(mail:string, projectId:string):Promise<number>{
        return this.http.get(BaseUrl.name +'api/opinion/'+projectId+"/"+mail)
            .toPromise()
            .then(response =>
                response.json() as number
            )
            .catch(this.handleError);
    }
    removeVote(mail:string, projectId:string){
        return this.http.delete(BaseUrl.name +'api/opinion/'+projectId+"/"+mail, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
