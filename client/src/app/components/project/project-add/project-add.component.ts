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
import { Router} from '@angular/router';

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
              private flashMessagesService: FlashMessagesService,
              private router: Router) {
  }

  ngOnInit() {
    this.departmentService.getAll().subscribe(dpts => {
      this.country.departments = dpts;
    })
    this.updateProjectForm();
    this.updateTenderForm(null);
  }

  addProject(){
    console.log("debut");
    this.uploader.queue[0].upload();
    let params = this.editProjectForm.value;
    params.offers=this.uploader.queue[0].file.name;
    this.project.title=params.title;
    this.project.latitude=params.latitude;
    this.project.longitude=params.longitude;
    this.project.offers=params.offers;
    this.project.image=params.image;

    var adress={streetNumber:params.streetNumber, streetName:params.streetName,
      city:params.city,postalCode:params.postalCode,
      department:params.department,country:params.country};
    this.project.address=adress;

    console.log("Let's try !");
    this.projectService.add(this.project).subscribe(res => {
      alert("Le projet a bien été ajouté !");
      this.router.navigate(['/profile']);
    })

  }
  updateProjectForm() {
    this.editProjectForm = this.formBuilder.group({
      title: [this.project.title, Validators.required],
      latitude: [this.project.latitude ? this.project.latitude : 0, Validators.required],
      longitude: [this.project.longitude  ? this.project.longitude : 0, Validators.required],

      offers: [this.project.offers ? this.project.offers : ''],
      image: [this.project.image ? this.project.offers: '/ressources/images/undefined.jpg'],

      country: [this.project.address ? this.project.address.country : ''],
      department: [this.project.address ? this.project.address.department : ''],
      city: [this.project.address ? this.project.address.city : ''],
      postalCode: [this.project.address ? this.project.address.postalCode : null],
      streetNumber: [this.project.address ? this.project.address.streetNumber : null],
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


