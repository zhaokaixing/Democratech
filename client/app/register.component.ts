/**
 * Created by flwrnt on 23/03/2017.
 */
import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { OrganisationService } from "./service/organisation.service";
import { CitizenService } from "./service/citizen.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import {DepartmentService} from "./service/department.service";
import {CityService} from "./service/city.service";

import { Citizen } from "./model/Citizen";
import { Organisation } from "./model/Organisation";
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

  constructor(private departmentService: DepartmentService, 
              private cityService: CityService, 
              private citizenService: CitizenService, 
              private organisationService: OrganisationService, 
              private formBuilder: FormBuilder,
              private router: Router,
              private flashMessagesService: FlashMessagesService) {

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

      'country' : ["0", Validators.required],

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
      'name': [null, [Validators.required,
          Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],

      'mail': [null, Validators.required],

      'password': [null, [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          //To improve
          Validators.pattern('[a-zA-Z]+[0-9]+')]],

      'passwordConfirmation' : [null, [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern('[a-zA-Z]+[0-9]+')]],

      'type': ['Public'],

      'country' : ["0", [Validators.required]],

      'department' : [null, Validators.required],

      'city' : [null, Validators.required],

      'postalCode' : [null, [Validators.required,
          Validators.pattern('[0-9]{5}')]],

      'streetNumber' : [null, Validators.required],

      'streetName' : [null, [Validators.required,
          Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*')]],
    })
  }

  ngOnInit() {
    this.departmentService.getAll()
      .subscribe(dpts => this.country.departments = dpts);
  }

  doRegister(event: any) {
    console.log(event);

    if (this.registerOrganisationForm.status == "VALID") {
      let params = this.registerOrganisationForm.value
      let newOrganisation : Organisation = {
        name: params.name,
        mail: params.email,
        password: params.password,
        authority: false,
        isPublic: params.type,
        address : {
          streetNumber: params.streetNumber,
          streetName : params.streetName,
          city: params.city,
          postalCode : params.postalCode,
          department : params.department,
          country : params.country
        }
      }

      this.organisationService.add(newOrganisation).subscribe(res =>{
        console.log(res)
        if (res._id) {
          this.flashMessagesService.show('Vous êtes enregistré ! Pensez à vérifier votre email pour vous connecter.', { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/home'])
        }
        else this.flashMessagesService.show('Une erreur est survenue lors de l\'enregistrement.', { cssClass: 'alert-danger', timeout: 5000 });

      }) 
    } 
    else if (this.registerUserForm.status == "VALID") {
      let params = this.registerUserForm.value
      let newUser : Citizen = {
        name: params.name,
        lastName: params.lastName,
        mail: params.email,
        password: params.password,
        birthDate: new Date(),      //todo: parse date
        address : {
          streetNumber: params.streetNumber,
          streetName : params.streetName,
          city: params.city,
          postalCode : params.postalCode,
          department : params.department,
          country : params.country
        }
      }
      this.citizenService.add(newUser).subscribe(res => {
        console.log(res)
        if (res._id) {
          this.flashMessagesService.show('Vous êtes enregistré ! Pensez à vérifier votre email pour vous connecter.', { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/home'])
        }
        else this.flashMessagesService.show('Une erreur est survenue lors de l\'enregistrement.', { cssClass: 'alert-danger', timeout: 5000 });
      })
    }
  }
}

