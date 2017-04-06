/**
 * Created by flwrnt on 23/03/2017.
 */
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
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
  registerUserForm : FormGroup;
  registerOrganisationForm : FormGroup;

  constructor(private departmentService: DepartmentService, private cityService: CityService, formBuilder: FormBuilder) {
    this.registerUserForm = formBuilder.group({

      'lastName': [null, [Validators.required,
        Validators.pattern('[a-zA-Z]*')]],

      'name': [null, [Validators.required,
       Validators.pattern('[a-zA-Z]*')]],

      'email': [null, Validators.required],

      'password': [null, [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        //To improve
        Validators.pattern('[a-zA-Z0-9]+')]],

      'passwordConfirmation' : [null, [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern('[a-z]+[A-Z]+[0-9]+')
      ]],

      'country' : [null, [Validators.required,
        Validators.pattern('[a-zA-Z]*')]],

      'department' : [null, Validators.required],

      'city' : [null, [Validators.required,
        Validators.pattern('[a-zA-Z]*')]],

      'postalCode' : [null, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern('[0-9]*')]],

      'streetNumber' : [null, Validators.required],

      'streetName' : [null, [Validators.required,
        Validators.pattern('[a-zA-Z]*')]],
    })

      this.registerOrganisationForm = formBuilder.group({
      'nameOrganisation': [null, [Validators.required,
          Validators.pattern('[a-zA-Z]*')]],

      'emailOrganisation': [null, Validators.required],

      'passwordOrganisation': [null, [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          //To improve
          Validators.pattern('[a-zA-Z0-9]*')]],

      'passwordConfirmationOrganisation' : [null, [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern('[a-zA-Z0-9]*')
      ]],

      'countryOrganisation' : [null, [Validators.required,
          Validators.pattern('[a-zA-Z]*')]],

      'departmentOrganisation' : [null, Validators.required],

      'cityOrganisation' : [null, [Validators.required,
          Validators.pattern('[a-zA-Z]*')]],

      'postalCodeOrganisation' : [null, [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern('[0-9]*')]],

      'streetNumberOrganisation' : [null, Validators.required],

      'streetNameOrganisation' : [null, [Validators.required,
          Validators.pattern('[a-zA-Z]*')]],
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

