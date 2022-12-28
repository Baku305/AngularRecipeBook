import { Component, Output, EventEmitter, ViewChild, ElementRef, OnInit, HostListener, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modal.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListServiceService } from '../shopping-list-service.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  constructor(private elRef : ElementRef,private shoppingService : ShoppingListServiceService, private modalService : ModalService){}

  @ViewChild('f', { static: false }) slForm!: NgForm;

  subscription! : Subscription;
  editMode = false;
  editedItemIndex! : number;
  editedItem! : Ingredient;

  ngOnInit(): void {
    this.modalService.onModalError.subscribe(modal => this.modalError = modal)
    this.subscription =  this.shoppingService.startedEditing.subscribe((i : number) => {
      this.editMode = true;
      this.editedItemIndex = i;
      this.editedItem = this.shoppingService.getIngredient(i);
      this.slForm.setValue({
        name : this.editedItem.name,
        amount : this.editedItem.amount
      })
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  modalError! : boolean;

  @HostListener('document:click',['$event']) dropdownOff(event:Event){
    this.elRef.nativeElement.contains(event.target) ? null :
    this.modalError = false;
  }

  onSubmit(form : NgForm){
    if (this.editMode) {
      this.shoppingService.onUpdateIngredient(this.editedItemIndex,new Ingredient(form.value.name,form.value.amount))
    }else if (form.value.name === '' || form.value.amount <= 0) {
      this.modalService.onModalError.emit(true)
    } else {
      this.shoppingService.onPushToIngredients(new Ingredient(form.value.name,form.value.amount))
      this.modalService.onModalError.emit(false)
    }
    form.reset()
    this.editMode = false;
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingService.onDeleteItem(this.editedItemIndex);
    this.onClear()
  }

}
