/**
 * Created by quentinC on 03/03/2017.
 */
export class Country{
    name : String;
    listCounties : [{
        name: String;
        listCities: [{
            name: String;
            zipCode: String;
        }]
    }]
}