import { Component, OnInit, Input } from '@angular/core';
import { User } from "app/models/User";
import { FileUploader,FileItem,ParsedResponseHeaders } from 'ng2-file-upload';
import { BaseUrl } from '../../../config/auth.config'
import {ProjectService} from "../../../services/project.service"

const URL = BaseUrl.API+'api/project/add';

@Component({
  selector: 'app-profile-organisation',
  templateUrl: './profile-organisation.component.html',
  styleUrls: ['./profile-organisation.component.css']
})

export class ProfileOrganisationComponent implements OnInit {
  @Input() user: User;
  public uploader:FileUploader = new FileUploader({url: URL});


  constructor(private projectService: ProjectService) { }

  ngOnInit() {

  }
  close(){
    this.uploader= new FileUploader({url: URL});
  }
  /*
  sendFile(){
    this.projectService.addOffer()
      .subscribe(res => alert(res));
  }*/

}
