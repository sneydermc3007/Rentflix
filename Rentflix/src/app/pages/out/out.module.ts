import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule
  ],
  exports: [
    SignInComponent,
    SignUpComponent
  ]
})
export class OutModule { }
