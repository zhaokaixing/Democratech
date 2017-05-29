import {Component, OnInit, group} from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from "@angular/forms";

import { FlashMessagesService } from "angular2-flash-messages";
import { CityService } from "app/services/city.service";
import { DepartmentService } from "app/services/department.service";
import { UserService } from "app/services/user.service";
import { passwordMatcher } from "./passwordMatcher";

import { User } from "app/models/User";
import { Country } from "app/models/Country";
import {GlobalProfileService} from "../../services/global.service";
import { WindowRef } from "angular2-google-maps/core/utils/browser-globals";

import {MailService} from "../../services/mail.service";
import {Mail} from "../../models/Mail";


@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ DepartmentService, CityService, FormBuilder,MailService ]
})

export class RegisterComponent implements OnInit {
  country: Country = new Country('France')
  registerProfile: {}
  registerUserForm : FormGroup;
  registerOrganisationForm : FormGroup;
  name: FormControl;
  lastName: FormControl;
  password: FormControl;
  mail: FormControl;
  firstSubmit: boolean;

  constructor(private mailService:MailService,
              private departmentService: DepartmentService,
              private userService: UserService,
              private windowRef: WindowRef,
              private formBuilder: FormBuilder,
              private windowRef: WindowRef,
              private router: Router,
              private globalService : GlobalProfileService,
              private flashMessagesService: FlashMessagesService) {

    this.firstSubmit = false;

    this.name = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.mail = new FormControl('', Validators.required);

    this.registerUserForm = formBuilder.group({

      lastName: this.lastName,
      name: this.name,
      mail: this.mail,
      passwords: formBuilder.group({
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmation: ['',Validators.required]
      }, { validator: passwordMatcher }),
      date: [null],

      country : [''],
      department : [''],
      city : [null,
        [Validators.pattern('[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ -]*')]],
      postalCode: [null],
      streetNumber : [null],
      streetName : [null,
        [Validators.pattern('[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ -]*')]],
    })

    this.registerOrganisationForm = formBuilder.group({
      name: [null, Validators.required],
      mail: [null, Validators.required],
      passwords: formBuilder.group({
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmation: ['',Validators.required]
      }, { validator: passwordMatcher }),

      type: ['Public'],

      country: [''],
      department: [''],
      city: [null],
      postalCode: [null],
      streetNumber: [null],
      streetName: [null,
        [Validators.pattern('[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ -]*')]],
    })
  }

  ngOnInit() {
    this.departmentService.getAll()
      .subscribe(dpts => this.country.departments = dpts);
  }
  // todo: add SIRET number ?
  submit($event: any) {
    $event.preventDefault();
    this.firstSubmit = true;

    if (this.registerOrganisationForm.status == "VALID") {
      let params = this.registerOrganisationForm.value

      this.register(params, false);
    }
    else if (this.registerUserForm.status == "VALID") {
      let params = this.registerUserForm.value

      this.register(params, true);
    }
  }

  private register(params: any, isPhysic: boolean) {
    this.userService.userExist(params.mail, exist => {
        var newUser: User;
        if (!exist) {
          newUser = {
            isPhysic: isPhysic,
            name: params.name,
            mail: params.mail,
            password: params.passwords.password,
            address : {
              streetNumber: params.streetNumber,
              streetName : params.streetName,
              city: params.city,
              postalCode : params.postalCode,
              department : params.department,
              country : params.country
            }
          }
          if (isPhysic) {
            newUser.birthDate = new Date(params.date);
            newUser.lastName = params.lastName
          }
          else {
            newUser.authority = false;
            newUser.isPublic = params.type == 'Public' ? true : false;
          }
          console.log(newUser)

          this.userService.add(newUser).subscribe(res =>{
            console.log("result:")
            console.log(res)
            if (res._id) {

              console.log("hello");
              let mail:Mail = {
                from:'democratec.projet@gmail.com',
                to:newUser.mail,
                subject:'Vous êtes enregistré',
                text:'Vous êtes enregistré',
                html:'<b>Bonjour</b>'
              }
              this.mailService.send(mail).subscribe();
              this.flashMessagesService.show('Vous êtes enregistré ! Pensez à vérifier votre email pour vous connecter.', { cssClass: 'alert-success', timeout: 5000 });
              this.router.navigate(['/'])
              // console.log('success');
            }
            else this.flashMessagesService.show('Une erreur est survenue lors de l\'enregistrement.', { cssClass: 'alert-danger', timeout: 5000 });
          })
        }
        else {
          this.flashMessagesService.show('Vous êtes déjà enregistré !', { cssClass: 'alert-info', timeout: 5000 });
        }
      })
      this.windowRef.getNativeWindow().scrollTo(0,0);
    }
}

