import {Component, OnInit, group} from '@angular/core';
import { Router } from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

import { FlashMessagesService } from "angular2-flash-messages";
import { CityService } from "app/services/city.service";
import { DepartmentService } from "app/services/department.service";
import { UserService } from "app/services/user.service";

import { User } from "app/models/User";
import { Country } from "app/models/Country";
import {GlobalProfileService} from "../../services/global.service";

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ DepartmentService, CityService, FormBuilder]
})

export class RegisterComponent implements OnInit {

  country: Country = new Country('France')
  registerProfile: {}
  registerUserForm : FormGroup;
  registerOrganisationForm : FormGroup;

  constructor(private departmentService: DepartmentService,
              private cityService: CityService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private globalService : GlobalProfileService,
              private flashMessagesService: FlashMessagesService) {

    this.registerProfile = JSON.parse(localStorage.getItem('profile'));
    console.log(this.registerProfile)

    this.registerUserForm = formBuilder.group({
      'lastName': [this.registerProfile ? this.registerProfile["family_name"] : null, [Validators.required,
        Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],

      'name': [this.registerProfile ? this.registerProfile["given_name"] : null, [Validators.required,
       Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],

      'email': [this.registerProfile ? this.registerProfile["email"] : null, Validators.required],

      /*matchingPassword: formBuilder.group({
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required]
      }, {validator: this.areEqual}),*/

      'password': [null, [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        //To improve
        Validators.pattern('[a-zA-Z]+[0-9]+')]],

      passwordConfirmation : [null, [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z]+[0-9]+')
      ]],

      date: [null],

      'country' : [''],

      'department' : [''],

      'city' : [null,
        [Validators.pattern('[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ -]*')]],

      'postalCode' : [null,[Validators.pattern('[0-9]{5}')]],

      'streetNumber' : [null],

      'streetName' : [null,
        [Validators.pattern('[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ -]')]],
    })

    this.registerOrganisationForm = formBuilder.group({
      'name': [null, [Validators.required,
        Validators.pattern('[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ -]*')]],

      'mail': [this.registerProfile ? this.registerProfile["email"] : null, Validators.required],

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

      'country' : [''],

      'department' : [''],

      'city' : [null],

      'postalCode' : [null,
        [Validators.pattern('[0-9]{5}')]],

      'streetNumber' : [null],

      'streetName' : [null,
        [Validators.pattern('[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ -]*')]],
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
        socialId: this.registerProfile['identities'][0]['user_id'],
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
      let params = this.registerUserForm.value
      newUser = {
        socialId: this.registerProfile['identities'][0]['user_id'],
        isPhysic: true,
        name: params.name,
        lastName: params.lastName,
        mail: params.email,
        password: params.password,
        birthDate: new Date(params.date),
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

