import { Component, OnInit } from '@angular/core';
import { UserService } from "app/services/user.service";
import { User } from "app/models/User";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { ProfileCitizenComponent } from "app/components/profile/profile-citizen/profile-citizen.component";
import { ProfileOrganisationComponent } from "app/components/profile/profile-organisation/profile-organisation.component";
import { DepartmentService } from "app/services/department.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { userInfo } from "os";
import { Auth0Service } from "app/services/auth0.service";
import { WindowRef } from "angular2-google-maps/core/utils/browser-globals";

import { LoaderService } from 'app/services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ DepartmentService, FormBuilder ]
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  infoUserForm : FormGroup;
  passwordFormGroup : FormGroup;
  addressFormGroup : FormGroup;
  departments = [{}];

  constructor(private loaderService: LoaderService,
              private userService: UserService, private departmentService: DepartmentService,
              private formBuilder: FormBuilder, private flashMessagesService: FlashMessagesService,
              private windowRef: WindowRef,
              private router : Router, private authService: Auth0Service) {

    this.initializeFormInfo();
    this.initializePasswordForm();
    this.initializeAddressForm();
  }

  ngOnInit() {
    this.loaderService.display(true);
    let profile = JSON.parse(localStorage.getItem('profile'));
    let identity = profile['identities'][0];

    this.userService.getOne(identity['user_id'])
      .subscribe(usr => {
        this.user = usr ? usr : this.user;
        this.user.image = this.user.image ? this.user.image : profile['picture'];
        this.initializeFormInfo();
        this.initializePasswordForm();
        this.initializeAddressForm();
        this.loaderService.display(false);
      });
  }

  initializeFormInfo(){

    if(this.user.isPhysic){
      this.infoUserForm = this.formBuilder.group({
        lastName: [this.user.lastName ? this.user.lastName : '', [Validators.required,
          Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],
        name: [this.user.name, [Validators.required,
          Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],
        date: [this.user.birthDate ? this.user.birthDate.toString().substring(0,10): ''],
        mail: [this.user.mail , Validators.required],
        description:[this.user.description]
      })
    }
    else {
      this.infoUserForm = this.formBuilder.group({
        name: [this.user.name, [Validators.required,
          Validators.pattern('[a-zA-Z]*-* *[a-zA-Z]*')]],
        mail: [this.user.mail , Validators.required],
        description:[this.user.description]
      })
    }
  }

  initializePasswordForm(){
    this.passwordFormGroup = this.formBuilder.group({

      oldPassword: [null],

      password: [null, [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        //To improve
        Validators.pattern('[a-zA-Z]+[0-9]+')]],

      passwordConf: [null, [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern('[a-zA-Z]+[0-9]+')]]
    })
  }


  initializeAddressForm(){
    this.addressFormGroup = this.formBuilder.group({
      country : [''],

      department : [''],

      city : [null],

      postalCode : [null,
        [Validators.pattern('[0-9]{5}')]],

      streetNumber : [null],

      streetName : [null,
        [Validators.pattern('[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ -]*')]],
    })
  }
  getDepartments() {
    this.departmentService.getAll().subscribe(dpts => {
      this.departments = dpts;
    })
  }

  saveInfo($event: any) {
    $event.preventDefault();
    if (this.infoUserForm.status == "VALID") {
      let params = this.infoUserForm.value;

      this.user.name = params.name;
      if(this.user.isPhysic){
        this.user.lastName = params.lastName;
        this.user.birthDate = new Date(params.date);
      }
      this.user.description = params.description;

      this.userService.update(this.user).subscribe(res =>{
        if (res.ok) {
          this.flashMessagesService.show('Modifications enregistrées !', { cssClass: 'alert-success', timeout: 5000 });
        }
        else this.flashMessagesService.show('Une erreur est survenue lors de l\'enregistrement.', { cssClass: 'alert-danger', timeout: 5000 });
      })
      this.windowRef.getNativeWindow().scrollTo(0,0);
    }
  }

  changePassword($event: any) {
    if (this.infoUserForm.status == "VALID") {
      let params = this.passwordFormGroup.value;

    }
  }
}
