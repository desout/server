import * as express from 'express';
import {checkToken} from '../../verification/checkToken';
import {addEmployeeFn, deleteEmployeeFn, editEmployeeFn, getEmployeeFn, getEmployeesFn} from './employees.worker';

export const employeesRouter = express.Router();

//EMPLOYEES PART
employeesRouter.get('/', checkToken, getEmployeesFn);
employeesRouter.get('/:id', checkToken, getEmployeeFn);
employeesRouter.put('/', checkToken, addEmployeeFn);
employeesRouter.delete('/:id', checkToken, deleteEmployeeFn);
employeesRouter.post('/:id', checkToken, editEmployeeFn);

