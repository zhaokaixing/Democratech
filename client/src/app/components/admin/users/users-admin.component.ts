import { Component, OnInit } from '@angular/core';
import { UserService } from "app/services/user.service";
import { User } from "app/models/User";
import { Positioning } from 'angular2-bootstrap-confirm/position';
import { ConfirmOptions, Position } from "angular2-bootstrap-confirm";
import { FlashMessagesService } from "angular2-flash-messages";
import { WindowRef } from "angular2-google-maps/core/utils/browser-globals";

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

  constructor(private userService: UserService, 
              private windowRef: WindowRef,
              private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.getUsers();
  }

  deleteUser(id: number){
    this.userService.delete(this.users[id]._id).subscribe(res => {
      if (res.ok) {
        let username = this.users[id].name + (this.users[id].lastName ? ' ' + this.users[id].lastName : '');
        this.flashMessagesService.show('Utilisateur ' + username + ' supprimé !', 
          { cssClass: 'alert-success', timeout: 5000 });
        this.getUsers();
      }
      else this.flashMessagesService.show('Erreur lors de la suppression de l\'utilisateur.', 
            { cssClass: 'alert-danger', timeout: 5000 });

      this.windowRef.getNativeWindow().scrollTo(0,0);
    })
  }

  getUsers(){
    this.userService.getAll().subscribe(res => {
      this.users = res;
    })
  }
}
