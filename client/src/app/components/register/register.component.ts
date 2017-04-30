import { Component, OnInit } from '@angular/core';
import { Citizen } from "app/models/Citizen";
import { Organisation } from "app/models/Organisation";
import { Country } from "app/models/Country";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DepartmentService } from "app/services/department.service";
import { CityService } from "app/services/city.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { UserService } from "app/services/user.service";
import { User } from "app/models/User";

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ DepartmentService, CityService, UserService, FormBuilder ]
})

export class RegisterComponent implements OnInit {

  country: Country = new Country('France');
  registerUserForm : FormGroup;
  registerOrganisationForm : FormGroup;

  constructor(private departmentService: DepartmentService, 
              private cityService: CityService,
              private userService: UserService, 
              private formBuilder: FormBuilder,
              private router: Router,
              private flashMessagesService: FlashMessagesService) {

    // this.registerUserForm = formBuilder.group({

    //   'lastName': [null, [Validators.required,
    //     Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],

    //   'name': [null, [Validators.required,
    //    Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],

    //   'email': [null, Validators.required],

    //   'password': [null, [Validators.required,
    //     Validators.minLength(6),
    //     Validators.maxLength(12),
    //     //To improve
    //     Validators.pattern('[a-zA-Z]+[0-9]+')]],

    //   'passwordConfirmation' : [null, [Validators.required,
    //     Validators.minLength(6),
    //     Validators.maxLength(12),
    //     Validators.pattern('[a-zA-Z]+[0-9]+')
    //   ]],

    //   'day' : ['', Validators.required],
    //   'month' : ['', Validators.required],
    //   'year' : ['', Validators.required],

    //   'country' : ['', Validators.required],

    //   'department' : ['', Validators.required],

    //   'city' : [null, [Validators.required,
    //     Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*')]],

    //   'postalCode' : [null, [Validators.required,
    //     Validators.pattern('[0-9]{5}')]],

    //   'streetNumber' : [null, Validators.required],

    //   'streetName' : [null, [Validators.required,
    //     Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*')]],
    // })

    this.registerUserForm = formBuilder.group({

      'lastName': ['Doe', [Validators.required,
        Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],

      'name': ['John', [Validators.required,
       Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],

      'email': ['jd@mail.fr', Validators.required],

      'password': ['Azerty1', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        //To improve
        Validators.pattern('[a-zA-Z]+[0-9]+')]],

      'passwordConfirmation' : ['Azerty1', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern('[a-zA-Z]+[0-9]+')
      ]],

      'day' : ['1', Validators.required],
      'month' : ['1', Validators.required],
      'year' : ['1991', Validators.required],

      'country' : ['France', Validators.required],

      'department' : ['1', Validators.required],

      'city' : ['test', [Validators.required,
        Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*')]],

      'postalCode' : [45000, [Validators.required,
        Validators.pattern('[0-9]{5}')]],

      'streetNumber' : [1, Validators.required],

      'streetName' : ['rue du test', [Validators.required,
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

      'country' : ['', [Validators.required]],

      'department' : ['', Validators.required],

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

  doRegister($event: any) {
    console.log($event);
    $event.preventDefault();

    if (this.registerOrganisationForm.status == "VALID") {
      let params = this.registerOrganisationForm.value
      let newOrganisation : User = {
        isPhysic: false,
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
      console.log(newOrganisation);

      this.userService.add(newOrganisation).subscribe(res =>{
        console.log(res)
        if (res._id) {
          this.flashMessagesService.show('Vous êtes enregistré ! Pensez à vérifier votre email pour vous connecter.', { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/'])
          console.log('success');
        }
        else this.flashMessagesService.show('Une erreur est survenue lors de l\'enregistrement.', { cssClass: 'alert-danger', timeout: 5000 });

      }) 
    } 
    else if (this.registerUserForm.status == "VALID") {
      console.log(this.registerUserForm)
      let params = this.registerUserForm.value
      let newUser : User = {
        isPhysic: true,
        name: params.name,
        lastName: params.lastName,
        mail: params.email,
        password: params.password,
        birthDate: new Date(params.year, params.month, params.day),
        address : {
          streetNumber: params.streetNumber,
          streetName : params.streetName,
          city: params.city,
          postalCode : params.postalCode,
          department : params.department,
          country : params.country
        }
      }
      console.log(newUser);

      this.userService.add(newUser).subscribe(res => {
        console.log(res)
        if (res._id) {
          this.flashMessagesService.show('Vous êtes enregistré ! Pensez à vérifier votre email pour vous connecter.', { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/'])
          console.log('success');
        }
        else this.flashMessagesService.show('Une erreur est survenue lors de l\'enregistrement.', { cssClass: 'alert-danger', timeout: 5000 });
      })
    }
  }

}
