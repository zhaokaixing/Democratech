import {Project} from "./Project";
/**
 * Created by quentinC on 22/02/2017.
 */
export class Authority{
    mailAdresse : string;
    password : string;
    name : string;
    description : string;
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
}