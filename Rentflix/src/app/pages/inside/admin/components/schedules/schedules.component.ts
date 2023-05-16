import { Component } from '@angular/core';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent {

  public listLocales = [
    {
      persona: 'Juan Perez',
      fechaInicio: '10/10/2023',
      fechaFin: '15/10/2023',
      horario: 'Lunes a Viernes 8:00 am - 5:00 pm',
      local: 'Norte',
    },
    {
      persona: 'Pedro Perez',
      fechaInicio: '10/10/2023',
      fechaFin: '15/10/2023',
      horario: 'Lunes a Viernes 9:00 am - 6:00 pm',
      local: 'Sur',
    }
  ];

  constructor() { }
}
