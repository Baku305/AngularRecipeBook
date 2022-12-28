import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  modalError!: boolean;

  ngOnInit(): void {
    //ModalService.onModalError.subscribe(modal => this.modalError = modal)
  }

}
