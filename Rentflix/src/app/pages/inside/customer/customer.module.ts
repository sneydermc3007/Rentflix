import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';


@NgModule({
  declarations: [
    CustomerComponent,
    ModalInfoComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class CustomerModule { }
