import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../modal.service';
import { ShoppingListServiceService } from '../shopping-list/shopping-list-service.service';

@Directive({
  selector: '[appModalDirective]',
})
export class ModalDirectiveDirective {
  constructor(
    public elRef: ElementRef,
    private modalService: ModalService,
    public viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('document:click', ['$event']) modalOff(event: Event): void {
    this.elRef.nativeElement.contains(event.target)
      ? null
      : this.modalService.onModalError.next(false);
  }
}
