import {Dish} from '../../models/Dish';
import {addDish, deleteDish, getDish, getDishes, getDishIngredients, updateDish} from '../../modules/dishes.module';
import {responseType} from '../../models/responseType';
import {Ingredient} from '../../models/Ingredient';


export const getDishesFn = (req, res) => getDishes().then((value: Dish[]) => value ? res.status(200).send(value) : res.status(500));

export const getDishFn = (req, res) => getDish(req.params.id).then((value: Dish) => value ? res.status(200).send(value) : res.status(404).send(value));

export const getDishIngredientsFn = (req, res) => getDishIngredients(req.params.id).then((value: Ingredient[]) => value ? res.status(200).send(value) : res.status(404).send(value));

export const addDishFn = (req, res) => addDish(req.body as Dish).then((value: number) => value ? res.status(200).send({id: value}) : res.status(400).send(value));

export const deleteDishFn = (req, res) => deleteDish(req.params.id).then((value: responseType) => value ? res.status(200).send({id: req.params.id}) : res.status(404).send(value));

export const editDishFn = (req, res) => updateDish(req.body as Dish).then((value: responseType) => value ? res.status(200).send({id: req.body.idDish}) : res.status(400).send(value));
