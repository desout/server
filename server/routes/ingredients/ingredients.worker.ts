import {responseType} from "../../models/responseType";
import {addIngredient, getIngredient, getIngredients, updateIngredient} from '../../modules/ingredient.module';
import {Ingredient} from '../../models/Ingredient';


export const getIngredientsFn = (req, res) => getIngredients().then((value: Ingredient[]) => value ? res.status(200).send(value) : res.status(500));

export const getIngredientFn = (req, res) => getIngredient(req.params.id).then((value: Ingredient) => value ? res.status(200).send(value) : res.status(404).send(value));

export const addIngredientFn = (req, res) => addIngredient(req.body as Ingredient).then((value: responseType) => value ? res.status(200).send({id: value.insertId}) : res.status(400).send(value));

export const editIngredientFn = (req, res) => updateIngredient(req.body as Ingredient).then((value: responseType) => value ? res.status(200).send({id: req.body.idIngredient}) : res.status(400).send(value));
