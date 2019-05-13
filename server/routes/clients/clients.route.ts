import * as express from 'express';
import {checkTokenUser} from '../../verification/checkTokenUser';
import {checkToken} from '../../verification/checkToken';
import {addClientFn, deleteClientFn, editClientFn, getClientFn, getClientsFn} from './clients.worker';

export const clientsRouter = express.Router();

// CLIENTS PART
clientsRouter.get('/', checkToken, getClientsFn);
clientsRouter.get('/:id', checkTokenUser, getClientFn);
clientsRouter.put('/:id', checkToken, addClientFn);
clientsRouter.delete('/:id', checkToken, deleteClientFn);
clientsRouter.post('/:id', checkTokenUser, editClientFn);

