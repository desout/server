import * as express from 'express';
import {checkToken} from '../../verification/checkToken';
import {
    addCategoryFn,
    deleteCategoryFn,
    editCategoryFn,
    getCategoriesFn,
    getCategoryDishesFn,
    getCategoryFn
} from './categories.worker';

export const categoriesRouter = express.Router();

// CATEGORIES PART
categoriesRouter.get('/', getCategoriesFn);
categoriesRouter.get('/:id', getCategoryFn);
categoriesRouter.get('/:id/dishes', getCategoryDishesFn);
categoriesRouter.put('/:id', checkToken, addCategoryFn);
categoriesRouter.delete('/:id', checkToken, deleteCategoryFn);
categoriesRouter.post('/:id', checkToken, editCategoryFn);

