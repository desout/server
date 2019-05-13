import {db} from '../../app';
import {Department} from '../models/Department';
import {Dish} from '../models/Dish';
import {responseType} from "../models/responseType";

export const getDepartments = (): Promise<Department[]> => db.query('SELECT * FROM Departments');

export const getDepartment = (id: number): Promise<Department> => db.query(`SELECT * FROM Departments WHERE idDepartment = ${id}`);

export const deleteDepartment = (id: number): Promise<responseType> => db.query(`DELETE FROM Departments WHERE idDepartment = ${id}`);


export const addDepartment = (department: Department): Promise<responseType> => db.query('INSERT INTO Departments (`place`,' +
    ' `contacts`,' +
    ' `description`) VALUES (?)', prepareDepartment(department));

export const updateDepartment = (department: Department): Promise<responseType> => db.query('UPDATE Departments' +
    ' SET' +
    ' `place` = ?,' +
    ' `contacts` = ?,' +
    ' `description` = ? ' +
    'WHERE `idDepartment` =' + department.idDepartment + ';', prepareDepartment(department)[0]);

export const getDepartmentMenu = (id: number): Promise<Dish[]> => db.query(`SELECT
    Menu.isIncluded,
    Menu.cost,
    Dishes.idDish,
    Dishes.name,
    Dishes.idPhoto,
    Dishes.description,
    Dishes.prepareTime,
    Dishes.Categories_idCategory
FROM
    Menu
        LEFT JOIN
    Dishes ON Dishes_idDish = Dishes.idDish
WHERE
    Menu.Departments_idDepartment =  ${id};`);

export const getCategoryDepartmentMenu = (id: number, category: number): Promise<Dish[]> => db.query(`SELECT
    Menu.isIncluded,
    Menu.cost,
    Dishes.idDish,
    Dishes.name,
    Dishes.idPhoto,
    Dishes.description,
    Dishes.prepareTime,
    Dishes.Categories_idCategory
FROM
    Menu
        LEFT JOIN
    Dishes ON Dishes_idDish = Dishes.idDish
WHERE
    Menu.Departments_idDepartment =  ${id} AND Dishes.Categories_idCategory = ${category};`);

const prepareDepartment = (department: Department) =>
    [[
        department.place,
        department.contacts,
        department.description
    ]];
