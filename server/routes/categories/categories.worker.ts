import {addCategory, deleteCategory, getCategories, getCategory, updateCategory} from '../../modules/categories.module';
import {Category} from '../../models/Category';
import {responseType} from '../../models/responseType';
import {Dish} from '../../models/Dish';
import {getCategoryDishes} from '../../modules/dishes.module';

export const getCategoriesFn = (req, res) => getCategories().then((value: Category[]) => value ? res.status(200).send(value) : res.status(500));

export const getCategoryFn = (req, res) => getCategory(req.params.id).then((value: Category) => value ? res.status(200).send(value) : res.status(404).send(value));

export const addCategoryFn = (req, res) => addCategory(req.body as Category).then((value: responseType) => value ? res.status(200).send({id: value.insertId}) : res.status(400).send(value));

export const deleteCategoryFn = (req, res) => deleteCategory(req.params.id).then((value: responseType) => value ? res.status(200).send({id: req.params.id}) : res.status(404).send(value));

export const editCategoryFn = (req, res) => updateCategory(req.body as Category).then((value: responseType) => value ? res.status(200).send({id: req.body.idCategory}) : res.status(400).send(value));

export const getCategoryDishesFn = (req, res) => getCategoryDishes(req.params.id).then((value: Dish[]) => value ? res.status(200).send(value) : res.status(404).send(value));
