import {Tender} from "./Tender";
/**
 * Created by quentinC on 16/02/2017.
 */
export class Organisation{
    // 0 Authority   1 Enterprise
    boolOrga : boolean;
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

    listTender : Array<Tender>;
}