/**
 * Created by quentinC on 03/03/2017.
 */
export class Country{
    name : String;
    departments : [{
        name: String;
        cities: [{
            name: String;
            zipCode: String;
        }]
    }]
}