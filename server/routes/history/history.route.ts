import * as express from 'express';
import {checkToken} from '../../verification/checkToken';
import {
    addProviderHistoryFn,
    editProviderHistoryFn,
    getHistoryFn,
    getProviderHistoryFn,
} from "./history.worker";

export const historyRouter = express.Router();

// PROVIDERS PART
historyRouter.get('/', checkToken, getHistoryFn);
historyRouter.get('/:id', checkToken, getProviderHistoryFn);
historyRouter.put('/', checkToken, addProviderHistoryFn);
historyRouter.post('/', checkToken, editProviderHistoryFn);

