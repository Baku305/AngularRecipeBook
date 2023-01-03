import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeServiceService } from '../recipe-book/recipe-service.service';
import { Recipe } from '../recipe-book/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeServiceService,
    private authService: AuthService
  ) {}

  onSaveRecipes() {
    const recipes = this.recipesService.getRecepies();
    this.http
      .put(
        'https://ng-recipebook-564a8-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => console.log(response));
  }

  onfetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipebook-564a8-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => this.recipesService.setRecipes(recipes))
      );
  }
}
