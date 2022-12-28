import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListServiceService implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('milk', 10),
    new Ingredient('apples', 5),
  ];

  constructor() {}

  //@Output() addedIngredient = new EventEmitter<Ingredient>
  ingredientsEm = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  ngOnInit() {
    this.ingredientsEm.next(this.ingredients.slice());
  }

  onPushToIngredients(ingrendient: Ingredient) {
    let findendIngredient: Ingredient | undefined = this.ingredients.find(
      (e) => ingrendient.name.toLowerCase() === e.name.toLowerCase()
    );
    if (findendIngredient) {
      findendIngredient.amount =
        Number(findendIngredient.amount) + Number(ingrendient.amount);
    } else if (ingrendient.name != '' && Number(ingrendient.amount) > 0) {
      this.ingredients.push(ingrendient);
    }
    this.ingredientsEm.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(i: number) {
    return this.ingredients.slice()[i];
  }

  onUpdateIngredient(i: number, newIngredient: Ingredient) {
    this.ingredients[i] = newIngredient;
    this.ingredientsEm.next(this.ingredients.slice());
  }

  onDeleteItem(i: number) {
    this.ingredients.splice(i, 1);
    this.ingredientsEm.next(this.ingredients.slice());
  }
}
