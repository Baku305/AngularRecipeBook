import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { RecipeBookComponent } from './recipe-book.component';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeServiceService implements OnInit {
  constructor() {}

  recipesChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = [
    new Recipe(
      'Milk',
      'milk',
      'https://staticfanpage.akamaized.net/wp-content/uploads/sites/21/2022/05/primi-piatti-pesce-ricette-1200x675.jpg',
      [new Ingredient('milk', 1)]
    ),
    new Recipe(
      'Bread',
      'bread',
      'https://staticfanpage.akamaized.net/wp-content/uploads/sites/21/2022/05/primi-piatti-pesce-ricette-1200x675.jpg',
      [new Ingredient('farina', 10), new Ingredient('acqua', 1)]
    ),
  ];

  ngOnInit() {}

  getRecepies() {
    return this.recipes.slice();
  }

  getRecipesById(id:number){
    return this.recipes.slice()[id]
  }

  updateRecipe(id: number , recipe : Recipe){
    this.recipes[id] = recipe
    this.recipesChanged.next(this.recipes.slice())
  }

  addRecipe(recipe : Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(id:number){
    this.recipes.splice(id,1);
    this.recipesChanged.next(this.recipes.slice())
  }
}
