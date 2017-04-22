/**
 * Created by flwrnt on 28/03/17.
 */
import {Project} from "./Project";

export class User {
    readonly _id?: string;
    mail : string;
    password : string;
    name : string;
    lastName?: string;
    birthDate? : Date;
    description? : string;
    SIRET? : number;
    phone? : string;
    authority?: boolean;
    isPublic?: boolean;
    image: string;
    address : {
        streetNumber: number;
        streetName : string;
        city: string;
        postalCode : string;
        department : string;
        country : string;
    }
}