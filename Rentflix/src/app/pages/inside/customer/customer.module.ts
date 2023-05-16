import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomerComponent } from './customer.component';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';
import { CitasComponent } from './components/citas/citas.component';
import { MoviesService } from './services/movies.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CustomerComponent,
    ModalInfoComponent,
    CitasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ MoviesService ],
})
export class CustomerModule { }
