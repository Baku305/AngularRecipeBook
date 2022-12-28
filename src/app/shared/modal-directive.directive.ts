import { Directive, ElementRef, HostListener } from '@angular/core';
import { ModalService } from '../modal.service';
import { ShoppingListServiceService } from '../shopping-list/shopping-list-service.service';

@Directive({
  selector: '[appModalDirective]'
})
export class ModalDirectiveDirective {

  constructor(private elRef : ElementRef) { }

  @HostListener('document:click',['$event']) modalOff(event:Event): void{
    this.elRef.nativeElement.contains(event.target) ? null :
    //ModalService.onModalError.emit(false)
    null
  }
}
