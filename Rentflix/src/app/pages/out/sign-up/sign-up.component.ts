import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public listGender = [
    { id: 1, value: 'H', label: 'Hombre' },
    { id: 2, value: 'M', label: 'Mujer' },
    // { id: 3, value: 'O', label: 'Other' }
  ];
  public selectGender: any;
  public showP: boolean = false;
  public listTypeHouse = [
    { id: 1, value: 'casa', label: 'Casa' },
    { id: 2, value: 'apartamento', label: 'Apartamento' },
    { id: 3, value: 'urbanización', label: 'Urbanización' },
  ];
  public selectTypeHouseValue: any;

  constructor() { }

  ngOnInit(): void {

  }

  showPass() {
    let x = document.getElementById("inputPassword");
    if (x) {
      if (x.getAttribute("type") === "password") {
        x.setAttribute("type", "text");
        this.showP = true;
      } else {
        x.setAttribute("type", "password");
        this.showP = false;
      }
    }
  }

  signUP() {
    console.log('signUP');
  }

}
