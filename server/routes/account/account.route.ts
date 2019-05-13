import * as express from 'express';
import {
    addUserFn,
    checkTokenAuth,
    getCurrentUserFn,
    loginUserFn,
    logoutUserFn,
    updatePasswordFn
} from './account.worker';

export const accountRouter = express.Router();

// ACCOUNT PART
accountRouter.post('/register', addUserFn);
accountRouter.post('/login', loginUserFn);
accountRouter.post('/logout', logoutUserFn);
accountRouter.post('/auth', checkTokenAuth);
accountRouter.post('/updatePassword', updatePasswordFn);
accountRouter.get('/currentUser', (req, res) => getCurrentUserFn(req, res));
