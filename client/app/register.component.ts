/**
 * Created by flwrnt on 23/03/2017.
 */
import { Component, OnInit } from '@angular/core';
import { OrganisationService } from "./service/organisation.service";
import { CitizenService } from "./service/citizen.service";
import {DepartmentService} from "./service/department.service";
import {CityService} from "./service/city.service";
import {Country} from "./model/Country";

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: 'views/register.component.html',
  providers: [ DepartmentService, CityService, CitizenService, OrganisationService ]
})

export class RegisterComponent implements OnInit {

  country: Country = new Country('France');

  constructor(private departmentService: DepartmentService, private cityService: CityService) {}

  ngOnInit() {
    this.departmentService.getAll()
      .subscribe(dpts => this.country.departments = dpts);

    this.cityService.getAll()
      .subscribe(cities => {
        this.country.cities = cities;
        console.log(this.country);
      });
  }
}
