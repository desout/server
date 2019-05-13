import {db} from '../../app';
import {responseType} from '../models/responseType';
import {Ingredient} from '../models/Ingredient';

export const getIngredients = (): Promise<Ingredient[]> => db.query(`SELECT Ingredients.idIngredient,
    Ingredients.name,
    Ingredients.count,
    Ingredients.cost
FROM db.Ingredients;`);

export const getIngredient = (id: number): Promise<Ingredient> => db.query(`SELECT Ingredients.idIngredient,
    Ingredients.name,
    Ingredients.count,
    Ingredients.cost
FROM db.Ingredients  WHERE idIngredient = ${id};`);

export const addIngredient = (ingredient: Ingredient): Promise<responseType> => db.query(`INSERT INTO db.Ingredients
(name,
count,
cost)
VALUES (?);`, prepareDish(ingredient));

export const updateIngredient = (ingredient: Ingredient): Promise<responseType> => db.query('UPDATE `db`.`Ingredients`\n' +
    'SET\n' +
    '`name` = ?,\n' +
    '`count` = ?,\n' +
    '`cost` = ?\n' +
    'WHERE `idIngredient` = ' + ingredient.idIngredient + ';', prepareDish(ingredient)[0]);

export const addIngredientByDish = (dishId: number, orderId): Promise<ResponseType> => db.query(`INSERT INTO db.Ingredients_has_Dishes
(Ingredients_idIngredient,
Dishes_idDish)
VALUES (?)`, [[orderId, dishId]]);

const prepareDish = (ingredient: Ingredient) =>
    [[
            ingredient.name,
            ingredient.count,
            ingredient.cost
    ]];
