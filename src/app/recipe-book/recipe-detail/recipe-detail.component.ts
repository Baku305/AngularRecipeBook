import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListServiceService } from 'src/app/shopping-list/shopping-list-service.service';
import { RecipeServiceService } from '../recipe-service.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  public animation: string = '';
  public id!: number;

  public recipe: Recipe = {
    name: '',
    description: '',
    imgPath: '',
    ingredients: [],
  };

  constructor(
    private router: Router,
    private recipeService: RecipeServiceService,
    private shoppingListService: ShoppingListServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.recipe = <Recipe>this.recipeService.getRecepies().find(r => r.name === this.route.snapshot.params['recipe'])
    this.route.params.subscribe((p: Params) => {
      this.recipe = <Recipe>this.recipeService.getRecipesById(p['id']);
      this.id = p['id'];
    });
  }

  // inputRecipe(recipe : Recipe){
  //   this.recipe = recipe;
  // }

  addIngredientOnShoppingList(ingredients: Ingredient[]) {
    for (let index = 0; index < ingredients.length; index++) {
      this.shoppingListService.onPushToIngredients(ingredients[index]);
    }
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipe_book']);
  }
}
