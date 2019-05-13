import {addEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee} from "../../modules/employees.module";
import {Employee} from "../../models/Employee";
import {responseType} from "../../models/responseType";


export const getEmployeesFn = (req, res) => getEmployees().then((value: Employee[]) => value ? res.status(200).send(value) : res.status(500));

export const getEmployeeFn = (req, res) => getEmployee(req.params.id).then((value: Employee) => value ? res.status(200).send(value) : res.status(404).send(value));

export const addEmployeeFn = (req, res) => addEmployee(req.body as Employee).then((value: responseType) => value ? res.status(200).send({id: value.insertId}) : res.status(400).send(value));

export const deleteEmployeeFn = (req, res) => deleteEmployee(req.params.id).then((value: responseType) => value ? res.status(200).send({id: req.params.id}) : res.status(404).send(value));

export const editEmployeeFn =  (req, res) => updateEmployee(req.body as Employee).then((value: responseType) => value ? res.status(200).send({id: req.body.idEmployee}) : res.status(400).send(value));
