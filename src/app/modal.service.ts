import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  onModalError = new BehaviorSubject<boolean>(false);

  onModalmessage = new BehaviorSubject<string>('');
  constructor() {}
}
