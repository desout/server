import {db} from '../../app';
import {Category} from '../models/Category';
import {responseType} from "../models/responseType";

export const getCategories = (): Promise<Category[]> => db.query('SELECT * FROM Categories');

export const getCategory = (id: number): Promise<Category> => db.query(`SELECT * FROM Categories WHERE idCategory = ${id}`);

export const deleteCategory = (id: number): Promise<responseType> => db.query(`DELETE FROM Categories WHERE idCategory = ${id}`);


export const addCategory = (category: Category): Promise<responseType> => db.query('INSERT INTO Categories (`name`,' +
    ' `idPhoto`,' +
    ' `description`) VALUES (?)', prepareCategory(category));

export const updateCategory = (category: Category): Promise<responseType> => db.query('UPDATE Categories' +
    ' SET' +
    ' `name` = ?,' +
    ' `idPhoto` = ?,' +
    ' `description` = ? ' +
    'WHERE `idCategory` = ' + category.idCategory + ';', prepareCategory(category)[0]);

const prepareCategory = (category: Category) =>
    [[
        category.name,
        category.idPhoto,
        category.description
    ]];
