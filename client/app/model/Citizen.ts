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
        diplomas : [{
            title : string;
            date : string;
        }]
        skill : [{
            label : string;
            level : number;
        }]
        job : [{
            label : string;
            startDate : Date;
            endDate : Date;
            description : string;
            category : string;
        }]
    }
    tag : [{
        label : string;
        category : string;
    }]
    projet : [{
        title : string;
        mark : number;
        progress : number;
        comment : [{
            date : Date;
            comment : string;
        }]
        latitude : number;
        longitude : number;
    }]
}