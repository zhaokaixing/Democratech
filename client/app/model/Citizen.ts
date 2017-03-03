
import {Project} from "./Project";
/**
 * Created by quentinC on 16/02/2017.
 */
export class Citizen{
    mail : string;
    password : string;

    firstName : string;
    lastName : string;
    birthDate : Date;
    address : {
        streetNumber: number;
        streetName : string;
        city: string;
        postalCode : string;
        department : string;
        country : string;
    }
    resume: {
        path : string;
        diplomas : [{
            title : string;
            date : string;
        }]
        skills : [{
            label : string;
            level : number;
        }]
        jobs : [{
            label : string;
            startDate : Date;
            endDate : Date;
            description : string;
            category : string;
            tags : [{
                label : string;
                category : string;
            }]
        }]
    }
    tags : [{
        label : string;
        category : string;
    }]
    projects : Array<Project>;
}