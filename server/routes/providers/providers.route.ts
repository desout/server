import * as express from 'express';
import {checkToken} from '../../verification/checkToken';
import {addProviderFn, editProviderFn, getProviderFn, getProvidersFn} from './providers.worker';

export const providersRouter = express.Router();

//PROVIDERS PART
providersRouter.get('/', checkToken, getProvidersFn);
providersRouter.get('/:id', checkToken, getProviderFn);
providersRouter.put('/', checkToken, addProviderFn);
providersRouter.post('/:id', checkToken, editProviderFn);

