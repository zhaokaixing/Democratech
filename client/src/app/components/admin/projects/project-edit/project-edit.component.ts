import { Component, OnInit, Input } from '@angular/core';
import { Project } from "app/models/Project";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DepartmentService } from "app/services/department.service";
import { Country } from "app/models/Country";
import { ProjectService } from "app/services/project.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { WindowRef } from "angular2-google-maps/core/utils/browser-globals";
import { ProjectsAdminComponent } from "app/components/admin/projects/projects-admin.component";

@Component({
  selector: 'app-project-edit-admin',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
  providers: [ DepartmentService ]
})
export class ProjectEditComponent implements OnInit {
  @Input() project: Project;

  public editProjectForm: FormGroup;
  public editTenderForm: FormGroup;
  public country: Country = new Country('France');
  public title: string = 'Avertissement';
  public message: string = 'Ếtes vous sure de vouloir supprimer ce projet ? Cette action n\'est pas réversible.';

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

  editProject($event) {
    if (this.editProjectForm.status == "VALID") {
      let inputs = this.editProjectForm.value
      this.project.title = inputs.title;
      this.project.longitude = inputs.longitude;
      this.project.latitude = inputs.latitude;
      this.project.address.country = inputs.country;
      this.project.address.city = inputs.city;
      this.project.address.department = inputs.department;
      this.project.address.streetName = inputs.streetName;
      this.project.address.streetNumber = inputs.streetNumber;
    }
    console.log(this.project)
    this.projectService.update(this.project).subscribe(res => {
      if (res.ok) {
        this.flashMessagesService.show('Modifications enregistrées !', { cssClass: 'alert-success', timeout: 5000 });
      } else this.flashMessagesService.show('Une erreur est survenue lors de l\'enregistrement.', { cssClass: 'alert-danger', timeout: 5000 });
      this.windowRef.getNativeWindow().scrollTo(0,0);
    })
  }

  editTender($event) {

  }

  deleteTender(id: number){
    this.projectService.deleteTender(this.project._id, this.project.tenders[id]._id).subscribe(res => {
      console.log(res);
      if (res.ok) {
        console.log("tender deleted");
      }
    })
  }

  selectTender(tender: any) {
    this.updateTenderForm(tender);
  }
}
