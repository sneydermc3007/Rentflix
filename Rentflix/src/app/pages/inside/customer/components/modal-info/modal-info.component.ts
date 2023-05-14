import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent implements OnInit {

  @Input() data: any;

  ngOnInit(): void {
    // console.log("Data: ", this.data);
  }
}
