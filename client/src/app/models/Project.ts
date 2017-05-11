/**
 * Created by quentinC on 20/02/2017.
 */
import { User } from "app/models/User";

export class Project {
    readonly _id: string;
    title : string;
    plusMark: number;
    minusMark: number;
    progress : number;
    latitude : number;
    longitude : number;
    image?: string;
    address : {
        streetNumber: number;
        streetName : string;
        city: string;
        postalCode : string;
        department : string;
        country : string;
    };
    tenders? : [{
        description : string;
        type : string;
        amount : number;
        mode : string;
        launchDate: Date;
        attributionDate : Date;
        signDate : Date;
        startDate : Date;
        authority : User;
        lots : {
            name : string;
            number : number;
        }
    }];
    owner: {
        name: string;
        id: string;
    }
}
