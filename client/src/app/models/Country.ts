/**
 * Created by quentinC on 03/03/2017.
 */
export class Country {
  name : String;
  departments: [Department];
  cities: [City];

  constructor(name: string) {
    this.name = name;
  }
}

class Department {
  _id: string;
  name: string;
  zip_code: number;
}

class City {
  _id: string;
  name: string;
  department: number;
  zip_code: number;
  latitude: number;
  longitude: number;
}