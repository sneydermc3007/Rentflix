import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GraficasComponent } from './components/graficas/graficas.component';
import { ProvedoresComponent } from './components/provedores/provedores.component';
import { MoviesComponent } from './components/movies/movies.component';
import { LocationComponent } from './components/location/location.component';
import { SchedulesComponent } from './components/schedules/schedules.component';

import { MoviesService } from '../customer/services/movies.service';

@NgModule({
  declarations: [
    AdminComponent,
    GraficasComponent,
    ProvedoresComponent,
    MoviesComponent,
    LocationComponent,
    SchedulesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    MoviesService
  ]
})
export class AdminModule { }
