
import {Project} from "./Project";
import {User} from "./User";
/**
 * Created by quentinC on 16/02/2017.
 */
export class Citizen implements User {
    _id: string;
    mail : string;
    password : string;
    name : string;
    lastName : string;
    birthDate : Date;
    image: string;
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