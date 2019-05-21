import * as express from 'express';
import {checkToken} from '../../verification/checkToken';
import {
    addDepartmentFn,
    deleteDepartmentFn,
    editDepartmentFn,
    getCategoryDepartmentMenuFn,
    getDepartmentFn,
    getDepartmentMenuFn,
    getDepartmentsFn
} from './departments.worker';

export const departmentsRouter = express.Router();

// DEPARTMENTS PART
departmentsRouter.get('/', getDepartmentsFn);
departmentsRouter.get('/:id', getDepartmentFn);
departmentsRouter.put('/', checkToken, addDepartmentFn);
departmentsRouter.delete('/:id', checkToken, deleteDepartmentFn);
departmentsRouter.post('/:id', checkToken, editDepartmentFn);
departmentsRouter.get('/:id/menu', checkToken, getDepartmentMenuFn);
departmentsRouter.get('/:id/:category/dishes', getCategoryDepartmentMenuFn);
