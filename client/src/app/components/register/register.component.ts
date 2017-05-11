import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { FlashMessagesService } from "angular2-flash-messages";
import { CityService } from "app/services/city.service";
import { DepartmentService } from "app/services/department.service";
import { UserService } from "app/services/user.service";

import { User } from "app/models/User";
import { Country } from "app/models/Country";

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ DepartmentService, CityService, FormBuilder ]
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

      'day' : ['', Validators.required],
      'month' : ['', Validators.required],
      'year' : ['', Validators.required],

      'country' : ['', Validators.required],

      'department' : ['', Validators.required],

      'city' : [null, [Validators.required,
        Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*')]],

      'postalCode' : [null, [Validators.required,
        Validators.pattern('[0-9]{5}')]],

      'streetNumber' : [null, Validators.required],

      'streetName' : [null, [Validators.required,
        Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*')]],
    })

    /**
     * ****************************************************************************
     * pre-fill citizen form
     * ****************************************************************************
     */
    // this.registerUserForm = formBuilder.group({

    //   'lastName': ['Doe', [Validators.required,
    //     Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],

    //   'name': ['John', [Validators.required,
    //    Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],

    //   'email': ['jd@mail.fr', Validators.required],

    //   'password': ['Azerty1', [Validators.required,
    //     Validators.minLength(6),
    //     Validators.maxLength(12),
    //     //To improve
    //     Validators.pattern('[a-zA-Z]+[0-9]+')]],

    //   'passwordConfirmation' : ['Azerty1', [Validators.required,
    //     Validators.minLength(6),
    //     Validators.maxLength(12),
    //     Validators.pattern('[a-zA-Z]+[0-9]+')
    //   ]],

    //   'day' : ['1', Validators.required],
    //   'month' : ['1', Validators.required],
    //   'year' : ['1991', Validators.required],

    //   'country' : ['France', Validators.required],

    //   'department' : ['1', Validators.required],

    //   'city' : ['test', [Validators.required,
    //     Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*')]],

    //   'postalCode' : [45000, [Validators.required,
    //     Validators.pattern('[0-9]{5}')]],

    //   'streetNumber' : [1, Validators.required],

    //   'streetName' : ['rue du test', [Validators.required,
    //     Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*-* *[a-zA-Z]*')]],
    // })

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
  // todo: add SIRET number ?
  doRegister($event: any) {
    $event.preventDefault();
    var newUser: User;
    if (this.registerOrganisationForm.status == "VALID") {
      let inputs = this.registerOrganisationForm.value
      newUser = {
        isPhysic: false,
        name: inputs.name,
        mail: inputs.email,
        password: inputs.password,
        authority: false,
        isPublic: inputs.type == 'Public' ? true : false,
        address : {
          streetNumber: inputs.streetNumber,
          streetName : inputs.streetName,
          city: inputs.city,
          postalCode : inputs.postalCode,
          department : inputs.department,
          country : inputs.country
        }
      }
    }
    else if (this.registerUserForm.status == "VALID") {
      console.log(localStorage.getItem('profile')['identities'][0]['user_id']);
      let params = this.registerUserForm.value
      newUser = {
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
    }
    console.log(newUser);

    this.userService.add(newUser).subscribe(res =>{
      console.log(res)
      if (res._id) {
        this.flashMessagesService.show('Vous êtes enregistré ! Pensez à vérifier votre email pour vous connecter.', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/'])
        // console.log('success');
      }
      else this.flashMessagesService.show('Une erreur est survenue lors de l\'enregistrement.', { cssClass: 'alert-danger', timeout: 5000 });
    })
  }
}
