import {Address} from "./Address";
import {Region} from "./Region";
/**
 * Created by quentinC on 16/02/2017.
 */

export class Municipality{
    name : string;
    postalCode : string;
    listAddress : Array<Address>;
    region : Region;
}