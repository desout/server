import {Category} from './Category';
import {Ingredient} from './Ingredient';

export interface Dish {
    idDish: number;
    name: string;
    idPhoto?: string;
    description: string;
    prepareTime?: number;
    Categories_idCategory?: Category;
    isIncluded?: boolean;
    cost?: number;
    ingredients?: Ingredient[];
}
