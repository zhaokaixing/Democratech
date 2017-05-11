import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "app/services/user.service";
import { User } from "app/models/User";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DepartmentService } from "app/services/department.service";
import { Country } from "app/models/Country";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [ DepartmentService ]
})
export class UserEditComponent implements OnInit {
  public user: User = new User();
  public country: Country = new Country('France');
  public editUserForm: FormGroup;

  constructor(private route: ActivatedRoute, 
              private userService: UserService, 
              private formBuilder: FormBuilder, 
              private departmentService: DepartmentService) {
      this.updateForm();
   }

  ngOnInit() {
    this.route.params.switchMap(params => {
      return this.userService.getOne(params['id']);
    })
    .subscribe(user => {
      this.user = user;
      this.updateForm();
    })

    this.departmentService.getAll().subscribe(dpts => {
      this.country.departments = dpts;
    })
  }

  updateForm() {
    this.editUserForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      lastName: [this.user.lastName],
      mail: [this.user.mail, Validators.required],

      day: [this.user.birthDate ? +this.user.birthDate.toString().substring(8,10) : ''],
      month: [this.user.birthDate ? +this.user.birthDate.toString().substring(5,7) : ''],
      year: [this.user.birthDate ? +this.user.birthDate.toString().substring(0,4) : ''],

      type: [this.user.isPublic ? 'Public' : 'Private'],

      country: [this.user.address ? this.user.address.country : ''],
      department: [this.user.address ? this.user.address.department : ''],
      city: [this.user.address ? this.user.address.city : ''],
      postalCode: [this.user.address ? this.user.address.postalCode : null],
      streetNumber: [this.user.address ? this.user.address.streetNumber : ''],
      streetName: [this.user.address ? this.user.address.streetName : ''],
    })
  }

  editUser($event) {
    if (this.editUserForm.status == "VALID") {
      let inputs = this.editUserForm.value
      console.log(inputs)
      console.log(this.user);

      this.user.name = inputs.name;
      this.user.address.country = inputs.country;
      this.user.address.city = inputs.city;
      this.user.address.department = inputs.department;
      this.user.address.streetName = inputs.streetName;
      this.user.address.streetNumber = inputs.streetNumber;

      if (this.user.isPhysic) {
        this.user.lastName = inputs.lastName;
        this.user.birthDate = new Date(inputs.year, inputs.month, inputs.day);
      }
      else {
        this.user.isPublic = inputs.type == 'Public' ? true : false;
      }

      this.userService.update(this.user).subscribe(res => {
        console.log('result:');
        console.log(res);
        //this.user = res;
        this.updateForm();
      })
    }
    else console.log('form not valid')
  }
}
