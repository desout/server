import {
    addDepartment,
    deleteDepartment,
    getCategoryDepartmentMenu,
    getDepartment,
    getDepartmentMenu,
    getDepartments,
    updateDepartment
} from '../../modules/departments.module';
import {Department} from '../../models/Department';
import {Dish} from '../../models/Dish';
import {responseType} from '../../models/responseType';

export const getDepartmentsFn = (req, res) => getDepartments().then((value: Department[]) => value ? res.status(200).send(value) : res.status(500));

export const getDepartmentFn = (req, res) => getDepartment(req.params.id).then((value: Department) => value ? res.status(200).send(value) : res.status(404).send(value));

export const addDepartmentFn = (req, res) => addDepartment(req.body as Department).then((value: responseType) => value ? res.status(200).send({id: value.insertId}) : res.status(400).send(value));

export const deleteDepartmentFn = (req, res) => deleteDepartment(req.params.id).then((value: responseType) => value ? res.status(200).send({id: req.params.id}) : res.status(404).send(value));

export const editDepartmentFn = (req, res) => updateDepartment(req.body as Department).then((value: responseType) => value ? res.status(200).send({id: req.body.idDepartment}) : res.status(400).send(value));

export const getDepartmentMenuFn = (req, res) => getDepartmentMenu(req.params.id).then((value: Dish[]) => value ? res.status(200).send(value) : res.status(404).send(value));

export const getCategoryDepartmentMenuFn = (req, res) => getCategoryDepartmentMenu(req.params.id, req.params.category).then((value: Dish[]) => value ? res.status(200).send(value) : res.status(404).send(value));
