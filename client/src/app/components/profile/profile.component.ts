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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ DepartmentService, FormBuilder ]
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  infoUserForm : FormGroup;
  departments = [{}];

  constructor(private userService: UserService, private departmentService: DepartmentService,
              private formBuilder: FormBuilder, private flashMessagesService: FlashMessagesService,
              private router : Router, private authService: Auth0Service) {

    this.initializeFormInfo();
  }
  
  ngOnInit() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let identity = profile['identities'][0];

    this.userService.getOne(identity['user_id'])
      .subscribe(usr => {
        this.user = usr ? usr : this.user;
        this.user.image = this.user.image ? this.user.image : profile['picture'];
        this.initializeFormInfo();
        console.log(this.user);
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

      console.log(this.user);

      this.userService.update(this.user).subscribe(res =>{
        console.log('result:');
        console.log(res);
        if (res.ok) {
          this.flashMessagesService.show('Modifications enregistrées !', { cssClass: 'alert-success', timeout: 5000 });
          
          this.router.navigate(['/profile']) ;

          console.log('success');
      
      
        }
         else this.flashMessagesService.show('Une erreur est survenue lors de l\'enregistrement.', { cssClass: 'alert-danger', timeout: 5000 });
      })

    }
  }
}
