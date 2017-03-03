import {Project} from "./Project";
/**
 * Created by quentinC on 16/02/2017.
 */
export class Organisation{
    mail : string;
    password : string;
    name : string;
    description : string;
    SIRET : number;
    phone : string;

    address : {
        streetNumber: number;
        streetName : string;
        city: string;
        postalCode : string;
        region : string;
        country : string;
    }
    projects : Array<Project>;

    jobs : [{
        label : string;
        startDate : Date;
        endDate : Date;
        description : string;
        category : string;
        listTags : [{
            label : string;
            category : string;
        }]
    }]
}