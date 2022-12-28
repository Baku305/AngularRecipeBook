import { Component, ElementRef, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../modal.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListServiceService } from './shopping-list-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnChanges, OnDestroy{

  ingredients! : Ingredient[];

  private ingSub! : Subscription;

  constructor(private shoppingService : ShoppingListServiceService, private modalService : ModalService){}

  ngOnDestroy(): void {
  this.ingSub.unsubscribe();
  }

  ngOnChanges(){
  }

  ngOnInit(){
    this.ingSub = this.shoppingService.ingredientsEm.subscribe( ingredients => this.ingredients = ingredients)
    this.ingredients = this.shoppingService.getIngredients()
  }

  onEditItem(i : number) {
    this.shoppingService.startedEditing.next(i);
  }


}
