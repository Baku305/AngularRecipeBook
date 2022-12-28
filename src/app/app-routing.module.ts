import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-book/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path:'', redirectTo: '/recipe_book', pathMatch: 'full'},
  {path : 'recipe_book', component : RecipeBookComponent, children : [
    {path : '', component : RecipeStartComponent},
    {path : 'new', component : RecipeEditComponent},
    {path : ':id', component : RecipeDetailComponent},
    {path : ':id/edit', component : RecipeEditComponent},
  ] },
  {path : 'shopping_list', component : ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
