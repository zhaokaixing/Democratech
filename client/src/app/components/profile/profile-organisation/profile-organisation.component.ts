import { Component, OnInit, Input } from '@angular/core';
import { User } from "app/models/User";
import { FileUploader,FileItem,ParsedResponseHeaders } from 'ng2-file-upload';
import { BaseUrl } from '../../../config/auth.config'
import { Router, ActivatedRoute } from '@angular/router';

const URL = BaseUrl.API+'api/project/add';

@Component({
  selector: 'app-profile-organisation',
  templateUrl: './profile-organisation.component.html',
  styleUrls: ['./profile-organisation.component.css']
})

export class ProfileOrganisationComponent implements OnInit {
  @Input() user: User;
  public uploader:FileUploader = new FileUploader({url: URL});


  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

  }
  close(){
    console.log(this.uploader.queue[0].file.name);
    this.uploader= new FileUploader({url: URL});
    this.router.navigate(['/edit/project']);
  }
  /*
  sendFile(){
    this.projectService.addOffer()
      .subscribe(res => alert(res));
  }*/

}
