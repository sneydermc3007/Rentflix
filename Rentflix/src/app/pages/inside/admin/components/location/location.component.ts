import { Component, OnInit } from '@angular/core';
import { LocalesService } from '../../services/locales.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  // public listLocales = [
  //   {
  //     zona: 'Norte',
  //     direccion: 'Calle 123 # 123 - 123',
  //     horario: 'Lunes a Viernes 8:00 am - 5:00 pm',
  //   },
  //   {
  //     zona: 'Sur',
  //     direccion: 'Calle 321 # 123 - 321',
  //     horario: 'Lunes a Viernes 9:00 am - 6:00 pm',
  //   }
  // ];

  public listLocales: any[] = []

  constructor(private _ubi: LocalesService) { }

  ngOnInit() {
    this._ubi.getLocation().subscribe(
      (res) => {
        this.listLocales = res
        console.log(this.listLocales)
      },
      (err) => console.log(err)
    )
  }

}
