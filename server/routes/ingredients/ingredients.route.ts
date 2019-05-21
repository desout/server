import * as express from 'express';
import {checkToken} from '../../verification/checkToken';
import {addIngredientFn, editIngredientFn, getIngredientFn, getIngredientsFn} from './ingredients.worker';

export const ingredientsRouter = express.Router();

// DISHES PART
ingredientsRouter.get('/',  getIngredientsFn);
ingredientsRouter.get('/:id', getIngredientFn);
ingredientsRouter.put('/', checkToken, addIngredientFn);
ingredientsRouter.post('/:id', checkToken, editIngredientFn);

