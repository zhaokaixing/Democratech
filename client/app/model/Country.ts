/**
 * Created by quentinC on 03/03/2017.
 */
export class Country{
  name : String;
  departments : [{
    _id: string;
    name: String;
    cities: [{
      name: String;
      zipCode: String;
    }]
  }]

  constructor(name: string) {
    this.name = name;
  }
}