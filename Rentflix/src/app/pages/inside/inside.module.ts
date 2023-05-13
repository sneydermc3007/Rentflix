import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsideRoutingModule } from './inside-routing.module';
import { HomeComponent } from './home/home.component';
import { AuthService } from '../out/services/auth.service';
import  { SharedModule } from './../../shared/shared.module';
import { TypeUserGuard } from '../guard/type-user.guard';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    InsideRoutingModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [ AuthService, TypeUserGuard ]
})
export class InsideModule { }
