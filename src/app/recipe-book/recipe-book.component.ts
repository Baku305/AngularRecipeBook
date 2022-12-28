import { Component, Input, OnInit } from '@angular/core';
import { RecipeServiceService } from './recipe-service.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.scss'],
})
export class RecipeBookComponent implements OnInit{

  constructor(){}

  ngOnInit(){
  }

}
