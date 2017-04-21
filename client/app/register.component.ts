/**
 * Created by flwrnt on 23/03/2017.
 */
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { OrganisationService } from "./service/organisation.service";
import { CitizenService } from "./service/citizen.service";
import { Citizen } from "./model/Citizen";
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

  constructor(private departmentService: DepartmentService, private cityService: CityService, private citizenService: CitizenService, formBuilder: FormBuilder) {
    this.registerUserForm = formBuilder.group({

      'lastName': [null, [Validators.required,
        Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],

      'name': [null, [Validators.required,
       Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],

      'email': [null, Validators.required],

      'password': [null, [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        //To improve
        Validators.pattern('[a-zA-Z]+[0-9]+')]],

      'passwordConfirmation' : [null, [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern('[a-zA-Z]+[0-9]+')
      ]],

      'country' : [null, Validators.required],

      'department' : [null, Validators.required],

      'city' : [null, [Validators.required,
        Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*')]],

      'postalCode' : [null, [Validators.required,
        Validators.pattern('[0-9]{5}')]],

      'streetNumber' : [null, Validators.required],

      'streetName' : [null, [Validators.required,
        Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*')]],
    })

      this.registerOrganisationForm = formBuilder.group({
      'nameOrganisation': [null, [Validators.required,
          Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],

      'emailOrganisation': [null, Validators.required],

      'passwordOrganisation': [null, [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          //To improve
          Validators.pattern('[a-zA-Z]+[0-9]+')]],

      'passwordConfirmationOrganisation' : [null, [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern('[a-zA-Z]+[0-9]+')]],

      'countryOrganisation' : [null, [Validators.required,
          Validators.pattern('[a-zA-Z]*-')]],

      'departmentOrganisation' : [null, Validators.required],

      'cityOrganisation' : [null, Validators.required],

      'postalCodeOrganisation' : [null, [Validators.required,
          Validators.pattern('[0-9]{5}')]],

      'streetNumberOrganisation' : [null, Validators.required],

      'streetNameOrganisation' : [null, [Validators.required,
          Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*')]],
    })
  }

   ngOnInit() {
    this.departmentService.getDepartments()
        .subscribe(dpts => this.country.departments = dpts);

    this.cityService.getCities()
        .subscribe(cities => this.country.departments);

    console.log(this.country);
  }

  doRegister(event: any) {
    console.log(event);
    if (this.registerOrganisationForm.status == "VALID") {
      console.log(this.registerOrganisationForm);
    } 
    else if (this.registerUserForm.status == "VALID") {
      console.log(this.registerUserForm);
      let params = this.registerUserForm.controls
      let newUser : Citizen = {
        name: params.name.value,
        lastName: params.lastName.value,
        mail: params.mail.value,
        password: params.password.value,
        birthDate: new Date(),
        address : {
          streetNumber: params.streetNumber.value,
          streetName : params.streetName.value,
          city: params.city.value,
          postalCode : params.postalCode.value,
          department : params.department.value,
          country : params.country.value
        }
      }
    }
  }
}

