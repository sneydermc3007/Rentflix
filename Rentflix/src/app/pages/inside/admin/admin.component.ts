import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Modales
import { ProvedoresComponent } from './components/provedores/provedores.component';
import { MoviesComponent } from './components/movies/movies.component';
import { LocationComponent } from './components/location/location.component';
import { SchedulesComponent } from './components/schedules/schedules.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private modalService: NgbModal) { }

  openModalProvedores() {
    console.log("Modal Provedores");
    this.modalService.open(ProvedoresComponent, { size: 'xl', centered: true });
  }

  openModalPeliculas() {
    console.log("Modal Peliculas");
    this.modalService.open(MoviesComponent, { size: 'xl', centered: true });
  }

  openModalLocales() {
    console.log("Modal Locales");
    this.modalService.open(LocationComponent, { size: 'xl', centered: true });
  }

  openModalHorarios() {
    console.log("Modal Horarios");
    this.modalService.open(SchedulesComponent, { size: 'xl', centered: true });
  }
}
