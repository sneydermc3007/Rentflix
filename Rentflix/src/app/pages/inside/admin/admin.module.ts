import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GraficasComponent } from './components/graficas/graficas.component';
import { ProvedoresComponent } from './components/provedores/provedores.component';

@NgModule({
  declarations: [
    AdminComponent,
    GraficasComponent,
    ProvedoresComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AdminModule { }
