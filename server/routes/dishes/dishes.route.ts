import * as express from 'express';
import {checkToken} from '../../verification/checkToken';
import {addDishFn, deleteDishFn, editDishFn, getDishesFn, getDishFn, getDishIngredientsFn} from './dishes.worker';

export const dishesRouter = express.Router();

// DISHES PART
dishesRouter.get('/',  getDishesFn);
dishesRouter.get('/:id', getDishFn);
dishesRouter.get('/:id/ingredients', getDishIngredientsFn);
dishesRouter.put('/', checkToken, addDishFn);
dishesRouter.delete('/:id', checkToken, deleteDishFn);
dishesRouter.post('/:id', checkToken, editDishFn);

