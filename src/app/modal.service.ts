import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  @Output() onModalError = new EventEmitter<boolean>()

  constructor() { }
}
