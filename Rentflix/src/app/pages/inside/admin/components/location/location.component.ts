import { Component, Input, OnInit } from '@angular/core';
import { LocalesService } from '../../services/locales.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  public listLocales: any[] = []
  public changeView = false

  public selectHorarioValue: any;
  public horariosDisponibles: any[] = [];

  constructor(private _ubi: LocalesService, private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  fieldZona: string = '';
  fieldDireccion: string = '';
  fieldHorario: string = '';

  ngOnInit() {
    this._ubi.getLocation().subscribe(
      (res) => {
        this.listLocales = res
        console.log(this.listLocales)
      },
      (err) => console.log(err)
    )
  }

  openFormLocales() {
    console.log('openFormLocales')
    this.changeView = true
    this._ubi.getHorario().subscribe(
      (res) => {
        // this.horariosDisponibles = res
        console.log("Get horarios: ", res)

        res.map((x: any, index: number) => {
          console.log("Horario: ", x)
          this.horariosDisponibles.push({
            id: x.idHorario,
            value: x.idHorario,
            label: x.horario
          })
        })
      },
      (err) => console.log("Error obteniendo los horarios: ", err)
    )
  }

  editLocales(pNombre: string) {
    console.log('editLocales: ', pNombre)
    const modalRef = this.modalService.open(NgbdModal2ContentLocation, { size: 'lg'});
    modalRef.componentInstance.data = this.listLocales.find(x => x.zonaUbicacion === pNombre);
    modalRef.componentInstance.horarios = this.horariosDisponibles;
  }

  addLocales() {
    console.log('addLocales')

    console.log("Horario seleccionado: ", this.selectHorarioValue)
    console.log("Direccion: ", this.fieldDireccion)
    console.log("Zona: ", this.fieldZona)

    this._ubi.addLocales({
      direccion: this.fieldDireccion,
      zonaUbicacion: this.fieldZona,
      idHorario: this.selectHorarioValue
    }).subscribe(
      (res) => {
        console.log("Res: ", res)
      },
      (err) => console.log("Error: ", err)
    )
  }
}

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [LocalesService],
  styles: [`
     h3 {
      text-align: center;
      font-weight: bolder;
      color: var(--color-secondary);
    }

    form label {
      margin-top: 10px;
    }

    label {
      font-weight: bold;
      font-style: italic;
    }

    button.editMovies {
      justify-content: center;
      display: grid;
      margin: 0 auto;
      background-color: var(--color-secondary) !important;
      color: #fff !important;
      font-weight: 700;
    }
  `],
  template: `
    <h3  class="mt-2" style="text-align: center;"> {{"EDITAR LOCALES"}}</h3>

    <div class="container mb-5">
      <form class="mt-4">
      <div class="m-3 container grid">
        <div class="row">
          <!--Row 1-->
          <div class="col-6">
            <label>Zona</label>
            <input type="text" class="form-control" name="local" placeholder="{{data.zonaUbicacion}}" [(ngModel)]="editfieldZona">
          </div>
          <div class="col-6">
            <label>Dirección</label>
            <input type="text" class="form-control" name="direccion" placeholder="{{data.direccion}}" [(ngModel)]="editfieldDireccion">
          </div>
          <!--Row 2-->
          <div class="col-6">
            <label>Horarios</label>
            <input type="text" class="form-control" name="horario" placeholder="{{data.horario}}" [(ngModel)]="editfieldHorario">
          </div>
        </div>
      </div>

      <button type="submit" (click)="edit()" class="btn editMovies mt-3">Actualizar pelicula</button>
      </form>
    </div>
  `
})
export class NgbdModal2ContentLocation implements OnInit {

  @Input() data: any;

  constructor(public activeModal: NgbActiveModal, private _ubi: LocalesService) { }

  editfieldZona: any;
  editfieldDireccion: any;
  editfieldHorario: any;

  valoresTemp: any;

  ngOnInit(): void {
    // console.log("Data: ", this.data)
    this.valoresTemp = JSON.parse(JSON.stringify(this.data))
  }

  edit() {
    let nuevosValores = {
      zonaUbicacion: this.editfieldZona === undefined ? this.valoresTemp.zonaUbicacion : this.editfieldZona,
      direccion: this.editfieldDireccion === undefined ? this.valoresTemp.direccion : this.editfieldDireccion,
      horario: this.editfieldHorario === undefined ? this.valoresTemp.horario : this.editfieldHorario
    }
    console.log("Nuevos valores: ", nuevosValores);
    console.log("Data: ", this.data.idLocal);

    this._ubi.editLocales(this.data.idLocal, nuevosValores).subscribe(
      (res) => {
        console.log("Res: ", res)
      },
      (err) => console.log("Error: ", err)
    );

    this.activeModal.close();

  }
}
