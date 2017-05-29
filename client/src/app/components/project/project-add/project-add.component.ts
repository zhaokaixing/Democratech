import { Component, OnInit } from '@angular/core';
import { Project } from "app/models/Project";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DepartmentService } from "app/services/department.service";
import { Country } from "app/models/Country";
import { ProjectService } from "app/services/project.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { WindowRef } from "angular2-google-maps/core/utils/browser-globals";
import { FileUploader,FileItem,ParsedResponseHeaders } from 'ng2-file-upload';
import { BaseUrl } from '../../../config/auth.config';

const URL = BaseUrl.API+'api/project/add';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
  providers: [ DepartmentService,ProjectService ]
})
export class ProjectAddComponent implements OnInit {
  public editProjectForm: FormGroup;
  public editTenderForm: FormGroup;
  public country: Country = new Country('France');
  public project: Project = new Project();
  public uploader:FileUploader = new FileUploader({url: URL});
  constructor(private formBuilder: FormBuilder,
              private windowRef: WindowRef,
              private departmentService: DepartmentService,
              private projectService: ProjectService,
              private flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    this.departmentService.getAll().subscribe(dpts => {
      this.country.departments = dpts;
    })
    this.updateProjectForm();
    this.updateTenderForm(null);
  }

  addProject(){
    console.log(this.uploader.queue[0].file.name);
    this.uploader.queue[0].upload();
    this.uploader= new FileUploader({url: URL});
  }
  updateProjectForm() {
    this.editProjectForm = this.formBuilder.group({
      title: [this.project.title, Validators.required],
      latitude: [this.project.latitude, Validators.required],
      longitude: [this.project.longitude, Validators.required],

      offers: [this.project.offers],
      image: [this.project.image],

      country: [this.project.address ? this.project.address.country : ''],
      department: [this.project.address ? this.project.address.department : ''],
      city: [this.project.address ? this.project.address.city : ''],
      postalCode: [this.project.address ? this.project.address.postalCode : null],
      streetNumber: [this.project.address ? this.project.address.streetNumber : ''],
      streetName: [this.project.address ? this.project.address.streetName : ''],
    })
  }

  updateTenderForm(tender: any) {
    this.editTenderForm = this.formBuilder.group({
      authority: [tender ? tender.authority : '', Validators.required],
      description: [tender ? tender.description : '', Validators.required],
      type: [tender ? tender.type : '', Validators.required],
      startDate: [tender ? tender.startDate : '', Validators.required],
      signDate: [tender ? tender.signDate : '', Validators.required],
      attributionDate: [tender ? tender.attributionDate : '', Validators.required],
      launchDate: [tender ? tender.launchDate : '', Validators.required],
      mode: [tender ? tender.mode : '', Validators.required],
      amount: [tender ? tender.amount : '', Validators.required],
    })
  }

}



