import {Project} from "./Project";
/**
 * Created by quentinC on 16/02/2017.
 */
export class Organisation{
    //Entreprise
    mailAdresse : string;
    password : string;
    name : string;
    description : string;
    SIRET : number;
    phoneNumber : string;

    address : {
        streetNumber: number;
        streetName : string;
        city: string;
        postalCode : string;
        region : string;
        country : string;
    }
    listProjects : Array<Project>;

    listJobs : [{
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