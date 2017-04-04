/**
 * Created by flwrnt on 23/03/2017.
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganisationService } from "./service/organisation.service";
import { CitizenService } from "./service/citizen.service";
import {DepartmentService} from "./service/department.service";
import {CityService} from "./service/city.service";
import {Country} from "./model/Country";

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: 'views/register.component.html',
  styleUrls: ['views/styles/register.component.styles.css'],
  providers: [ DepartmentService, CityService, CitizenService, OrganisationService, FormBuilder ]
})

export class RegisterComponent implements OnInit {

  country: Country = new Country('France');
  registerCitizenForm : FormGroup;

  constructor(private departmentService: DepartmentService, private cityService: CityService, formBuilder: FormBuilder) {
    this.registerCitizenForm = formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required]
    })
  }

  ngOnInit() {
    this.departmentService.getDepartments()
        .subscribe(dpts => this.country.departments = dpts);
    this.cityService.getCities()
        .subscribe(cities => this.country.departments);

    console.log(this.country);
  }
}

