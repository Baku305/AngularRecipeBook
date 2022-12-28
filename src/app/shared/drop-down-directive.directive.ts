
import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirectiveDirective {

  // @HostBinding('class')
  // dropdown!: string;

  isOpen : boolean = false;

  constructor(private elRef : ElementRef, private renderer : Renderer2) { }

  @HostListener('click') dropdownOn(){
    if (this.elRef.nativeElement.nextSibling.className.includes('show')) {
      this.renderer.removeClass(this.elRef.nativeElement.nextSibling,'show')
    } else if(!this.elRef.nativeElement.nextSibling.className.includes('show')){
      this.renderer.addClass(this.elRef.nativeElement.nextSibling,'show')
      this.isOpen = true;
    }
    //this.dropdown = 'show'
    //console.log(this.elRef.nativeElement);
  }

  @HostListener('document:click',['$event']) dropdownOff(event:Event){
    this.elRef.nativeElement.contains(event.target) ? null :
    this.renderer.removeClass(this.elRef.nativeElement.nextSibling,'show')
  }


}


