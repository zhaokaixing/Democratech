import { Component, OnInit } from '@angular/core';
import { UserService } from "app/services/user.service";
import { User } from "app/models/User";
import { Positioning } from 'angular2-bootstrap-confirm/position';
import { ConfirmOptions, Position } from "angular2-bootstrap-confirm";

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css'],
  providers: [ ConfirmOptions, { provide: Position, useClass: Positioning } ]
})
export class UsersAdminComponent implements OnInit {
  public title: string = 'Avertissement';
  public message: string = 'Ếtes vous sure de vouloir supprimer cet utilsateur ? Cette action n\'est pas réversible.';

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(res => {
      this.users = res;
      console.log(this.users);
    })
  }

  deleteUser(){
    console.log('todo');
  }
}
