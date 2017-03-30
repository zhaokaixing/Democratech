import { Component,OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import {Project, Projecct} from'./model/Project';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'views/project.component.html',
    styleUrls : ['views/styles/project.component.styles.css']
})

export class ProjectComponent implements OnInit{

    project:Projecct;

    constructor(private authService: AuthService) { this.project = new Projecct();}

    PROJECTS: Projecct[] = [
        {id: 1, image: '/ressources/images/ecole.jpg' , label: 'Construction', description: 'Construction d\'une école'},
        {id: 2, image: '/ressources/images/ecolo.jpg', label: 'Ecologie', description: 'Ouverture gîte écologique'},
        {id: 3, image: '/ressources/images/pont.jpg', label: 'Construction', description: 'Construction d\'un pont traversant la Loire'},
        {id: 4, image: '/ressources/images/route.jpg', label: 'Construction', description: 'Rénovation de l\'autoroute A10'}
    ];

    ngOnInit(): void {
        var idProjet = 0;
        idProjet = parseInt(localStorage.getItem("id").valueOf());
        localStorage.setItem("id", "0");
        this.project = this.PROJECTS[idProjet - 1];
    }
}
