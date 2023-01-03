import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modal.service';
import { RecipeServiceService } from '../recipe-service.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  recipeSubscribe!: Subscription;
  modalSub!: Subscription;

  constructor(
    private recepieService: RecipeServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.recipes = this.recepieService.getRecepies();
    this.recipeSubscribe = this.recepieService.recipesChanged.subscribe(
      (recipes) => (this.recipes = recipes)
    );
  }

  ngOnDestroy(): void {
    this.recipeSubscribe.unsubscribe();
  }

  recipeSelected(recipe: Recipe, i: number) {
    this.router.navigate([i], { relativeTo: this.route });
  }

  onAddNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  modalOn() {
    this.modalService.onModalError.next(true);
    this.modalService.onModalmessage.next('test');
  }
}
