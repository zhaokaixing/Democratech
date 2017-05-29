import { Component, OnInit, Input } from '@angular/core';
import { User } from "app/models/User";
import { FileUploader,FileItem,ParsedResponseHeaders } from 'ng2-file-upload';
import { BaseUrl } from '../../../config/auth.config'
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from "app/models/Project";

const URL = BaseUrl.API+'api/project/add';

@Component({
  selector: 'app-profile-organisation',
  templateUrl: './profile-organisation.component.html',
  styleUrls: ['./profile-organisation.component.css']
})

export class ProfileOrganisationComponent implements OnInit {
  @Input() user: User;
  public projects: [Project]
  public uploader:FileUploader = new FileUploader({url: URL});

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

  }

  close() {
    this.router.navigate(['/add']);
  }

  /*
  sendFile(){
    this.projectService.addOffer()
      .subscribe(res => alert(res));
  }*/

}
