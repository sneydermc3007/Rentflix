import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { OutModule } from './../out.module';

@Component({
  selector: 'app-sing',
  standalone: true,
  imports: [
    CommonModule, NgbNavModule, OutModule
  ],
  // templateUrl: './sing.component.html',
  // styleUrls: ['./sing.component.scss'],
  template: `
    <nav class="m-4">
      <ul ngbNav #nav="ngbNav" [(activeId)]="active" class="nav-tabs">
        <li [ngbNavItem]="1">
          <button ngbNavLink>Log In</button>
          <ng-template ngbNavContent>
            <app-sign-in></app-sign-in>
          </ng-template>
        </li>
        <li [ngbNavItem]="2">
          <button ngbNavLink>Sign Up</button>
          <ng-template ngbNavContent>
          <app-sign-up></app-sign-up>
          </ng-template>
        </li>
      </ul>
    </nav>
    <div [ngbNavOutlet]="nav" class="m-4"></div>
  `,
  styles: []
})
export class SingComponent {
	active = 1;
}
