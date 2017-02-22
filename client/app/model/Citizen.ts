
import {Project} from "./Project";
/**
 * Created by quentinC on 16/02/2017.
 */
export class Citizen{
    mailAdresse : string;
    password : string;

    firstName : string;
    lastName : string;
    birthDate : Date;
    address : {
        streetNumber: number;
        streetName : string;
        city: string;
        postalCode : string;
        region : string;
        country : string;
    }
    resume: {
        path : string;
        listDiplomas : [{
            title : string;
            date : string;
        }]
        listSkills : [{
            label : string;
            level : number;
        }]
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
    listTags : [{
        label : string;
        category : string;
    }]
    listProjects : Array<Project>;
}