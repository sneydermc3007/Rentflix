import { Component } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {

  public listLocales = [
    {
      zona: 'Norte',
      direccion: 'Calle 123 # 123 - 123',
      horario: 'Lunes a Viernes 8:00 am - 5:00 pm',
    },
    {
      zona: 'Sur',
      direccion: 'Calle 321 # 123 - 321',
      horario: 'Lunes a Viernes 9:00 am - 6:00 pm',
    }
  ];

    constructor() { }
}
