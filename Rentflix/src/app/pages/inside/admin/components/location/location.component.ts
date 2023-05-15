import { Component, OnInit } from '@angular/core';
import { LocalesService } from '../../services/locales.service';

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

  constructor(private _ubi: LocalesService) { }

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
