import {Citizen} from "./Citizen";
import {Organisation} from "./Organisation";
/**
 * Created by quentinC on 20/02/2017.
 */
export class Project{
    title : string;
    mark : number;
    progress : number;
    latitude : number;
    longitude : number;

   address : {
        streetNumber: number;
        streetName : string;
        city: string;
        postalCode : string;
        department : string;
        country : string;
    }
    comments : [{
        citizen : Citizen; // can be null
        user : Organisation ; // can be null
        date : Date;
        content : string;
    }]
    tenders : [{
        description : string;
        type : string;
        amount : number;
        mode : string;
        launchDate: Date;
        attributionDate : Date;
        signDate : Date;
        startDate : Date;
        authority : Organisation;
        lots : {
            name : string;
            number : number;
        }
    }]
}
export class Projecct {
    /** rajouter pour tester**/
    id:number;
    image: string;
    label:string;
    description:string;
}
