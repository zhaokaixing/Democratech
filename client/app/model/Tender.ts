import {Authority} from "./Authority";
import {Lots} from "./Lots";
/**
 * Created by quentinC on 16/02/2017.
 */

export class Tender{
    description : string;
    type : string;
    amount : number;
    mode : string;
    launchDate: Date;
    attributionDate : Date;
    signDate : Date;
    startDate : Date;
    authority : Authority;
    listLots : Array<Lots>;
}