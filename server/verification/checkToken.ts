import {verify, VerifyErrors} from 'jsonwebtoken';
import {Request, Response} from 'express';

export const SECRET_TOKEN = 'gfndnkxgdnodgfohifdgohigfhoid';

export const checkToken = (req: Request, res: Response, next: any) => {
    const {authorization} = req.cookies;
    if (authorization) {

        verify(authorization, SECRET_TOKEN, undefined, (err: VerifyErrors, decoded: any) => {
            if (err) {
                return res.status(400).clearCookie('authorization').send({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                if ((<any>decoded)['role'] !== 'CLIENT') {
                    next();
                    return res;
                } else {
                    return res.status(400).clearCookie('authorization').send({
                        success: false,
                        message: 'Token is not valid'
                    });
                }
            }
        });
    } else {
        return res.status(400).clearCookie('authorization').send({
            success: false,
            message: 'auth token is not supplied'
        });
    }
    return res;
};
