import {db} from '../../app';
import {Dish} from '../models/Dish';
import {responseType} from '../models/responseType';
import {addIngredientByDish} from './ingredient.module';
import {Ingredient} from '../models/Ingredient';

export const getDishes = (): Promise<Dish[]> => db.query(`SELECT Dishes.idDish,
    Dishes.name,
    Dishes.idPhoto,
    Dishes.description,
    Dishes.prepareTime,
    Dishes.Categories_idCategory
FROM db.Dishes;`);

export const getDish = (id: number): Promise<Dish> => db.query(`SELECT Dishes.idDish,
    Dishes.name,
    Dishes.idPhoto,
    Dishes.description,
    Dishes.prepareTime,
    Dishes.Categories_idCategory
FROM db.Dishes WHERE idDish = ${id};`);

export const getCategoryDishes = (id: number): Promise<Dish[]> => db.query(`SELECT Dishes.idDish,
    Dishes.name,
    Dishes.idPhoto,
    Dishes.description,
    Dishes.prepareTime,
    Dishes.Categories_idCategory
FROM db.Dishes WHERE Categories_idCategory = ${id};`);


export const deleteDish = (id: number): Promise<responseType> => db.query(`DELETE FROM Dishes WHERE idDish = ${id};`);


export const addDish = (dish: Dish): Promise<number> => db.query(`INSERT INTO db.Dishes
(name,
idPhoto,
description,
prepareTime,
Categories_idCategory)
VALUES (?);`, prepareDish(dish)).then(res => {
    const dishId: number = <number>res.insertId;
    if (dish.ingredients) {
        dish.ingredients.forEach(ingredient => addIngredientByDish(ingredient.idIngredient, dishId));
    }

    return Promise.resolve(dishId);
}).catch(res => Promise.reject(res));

export const getDishIngredients = (id: number): Promise<Ingredient[]> => db.query(`SELECT Ingredients.idIngredient,
    Ingredients.name,
    Ingredients.count,
    Ingredients.cost
FROM
    db.Ingredients_has_Dishes
        LEFT JOIN
    Ingredients ON Ingredients_idIngredient = Ingredients.idIngredient
WHERE
    Ingredients_has_Dishes.Dishes_idDish =  ${id};

`);

export const updateDish = (dish: Dish): Promise<responseType> => db.query('UPDATE db.Dishes' +
    ' SET' +
    ' `name` = ?,' +
    ' `idPhoto` = ?,' +
    ' `description` = ?,' +
    ' `prepareTime` = ?, ' +
    ' `Categories_idCategory` = ? ' +
    'WHERE `idDish` =' + dish.idDish + ';', prepareDish(dish)[0]);

export const addDishByOrder = (dishId: number, orderId): Promise<Dish> => db.query(`INSERT INTO db.Orders_has_Dishes
(Orders_idOrder,
Dishes_idDish)
VALUES (?)`, [[orderId, dishId]]);

const prepareDish = (dish: Dish) =>
    [[
        dish.name,
        dish.idPhoto,
        dish.description,
        dish.prepareTime,
        dish.Categories_idCategory
    ]];
