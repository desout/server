import * as express from 'express';
import {checkToken} from '../../verification/checkToken';
import {addOrderFn, deleteOrderFn, editOrderFn, getOrderDishesFn, getOrderFn, getOrdersFn} from './orders.worker';

export const ordersRouter = express.Router();

//ORDERS PART
ordersRouter.get('/', checkToken, getOrdersFn);
ordersRouter.get('/:id', checkToken, getOrderFn);
ordersRouter.get('/:id/dishes', checkToken, getOrderDishesFn);
ordersRouter.put('/', checkToken, addOrderFn);
ordersRouter.delete('/:id', checkToken, deleteOrderFn);
ordersRouter.post('/:id', checkToken, editOrderFn);

