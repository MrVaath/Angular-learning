import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx'

// Services
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {

    firebaseLink = 'https://ng-recipe-book-1af32.firebaseio.com/recipes.json';

    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put(this.firebaseLink, this.recipeService.getRecipes());
    }

    getRecipes() {
        return this.http.get(this.firebaseLink)
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;              
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}