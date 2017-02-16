import {Person} from "./Person";
import {Municipality} from "./Municipality";
/**
 * Created by quentinC on 16/02/2017.
 */
export class Address{
    streetNumber: number;
    streetName : string;
    listPerson : Array<Person>;
    muncipality: Municipality;
}