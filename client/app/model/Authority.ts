import {Project} from "./Project";
/**
 * Created by quentinC on 22/02/2017.
 */
export class Authority{
    mail : string;
    password : string;
    name : string;
    description : string;
    phone : string;
    address : {
        streetNumber: number;
        streetName : string;
        city: string;
        postalCode : string;
        department : string;
        country : string;
    };
    projects : Array<Project>;
}

