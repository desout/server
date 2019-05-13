import {sign, verify, VerifyErrors} from 'jsonwebtoken';
import {SECRET_TOKEN} from '../../verification/checkTokenUser';
import {Request, Response} from 'express';
import {checkUserPassword, getClient, updateClient, updatePasswordClient} from '../../modules/clients.module';
import {Client} from '../../models/Client';
import {
    checkEmployeePassword,
    getEmployee,
    updateEmployee,
    updatePasswordEmployee
} from '../../modules/employees.module';
import {UpdatePasswordUser} from '../../models/UpdatePasswordUser';
import {Employee} from '../../models/Employee';
import {responseType} from '../../models/responseType';
import jwt_decode = require('jwt-decode');

export function checkTokenAuth(req: Request, res: Response) {
    const {authorization} = req.cookies;

    if (authorization) {

        verify(authorization, SECRET_TOKEN, undefined, (err: VerifyErrors, decoded: string | object) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.params.decoded = decoded;
                return res.json({
                    success: true,
                    message: 'Token is valid'
                });
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
    return undefined;
}

function getExportClient(client: Client) {
    return {
        idClient: client.idClient,
        name: client.name,
        contacts: client.contacts,
        discount: client.discount
    };
}

function getExportEmployee(employee: Employee) {
    return {
        idEmployee: employee.idEmployee,
        firstName: employee.firstName,
        secondName: employee.secondName,
        lastName: employee.lastName,
        login: employee.login,
        passportData: employee.passportData,
        dateOfBirth: employee.dateOfBirth,
        role: employee.role,
        salary: employee.salary,
        contacts: employee.contacts,
        idDepartment: employee.idDepartment
    };
}

export function loginUserFn(req: Request, res: Response) {
    const username = req.body.name;
    const password = req.body.password;
    const isEmployee: boolean = !!req.body.isEmployee;
    if (username) {
        if (!isEmployee) {
            checkUserPassword({login: username, password: password}).then(response => {
                console.log(response);
                if (response.isValid) {
                    const token = sign({username: username, role: 'CLIENT'},
                        SECRET_TOKEN,
                        {expiresIn: '24h', subject: JSON.stringify({id: response.client.idClient, isClient: true})},
                    );
                    res.cookie('authorization', token, {httpOnly: true}).json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token,
                        object: JSON.stringify(getExportClient(response.client))
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Incorrect username or password'
                    });
                }
            });
        } else {
            checkEmployeePassword({login: username, password: password}).then(response => {
                console.log(response);
                if (response.isValid) {
                    const token = sign({username: username, role: response.employee.role},
                        SECRET_TOKEN,
                        {expiresIn: '24h', subject:  JSON.stringify({id: response.employee.idEmployee, isClient: false})},
                    );
                    res.cookie('authorization', token, {httpOnly: true}).json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token,
                        object: JSON.stringify(getExportEmployee(response.employee))
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Incorrect username or password'
                    });
                }
            });
        }
    } else {
        res.json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
}

export function addUserFn(req: Request, res: Response) {
    const user: { user: Client | Employee, role: string } = req.body as { user: Client | Employee, role: string };
    let updateUserPromise: Promise<responseType>;
    updateUserPromise = user.role === 'CLIENT' ? updateClient(user.user as Client) : updateEmployee(user.user as Employee);

    updateUserPromise.then((value: responseType) => value ? res.status(200).send({id: value.insertId}) : res.status(400).send(value));
}

export function logoutUserFn(req: Request, res: Response) {
    res.clearCookie('authorization').send();
}

export function updatePasswordFn(req: Request, res: Response): void {
    const user: UpdatePasswordUser = req.body as UpdatePasswordUser;
    let isComplete: Promise<number>;
    if (user.role === 'CLIENT') {
        isComplete = updatePasswordClient(user);
    } else {
        isComplete = updatePasswordEmployee(user);
    }
    isComplete.then(response => response === -1 ? res.status(200).send(response) : res.status(301));
}

export function getCurrentUserFn(req: Request, res: Response): void {
    const { authorization } = req.cookies ;
    const tokenInfo = jwt_decode(authorization);
    const tokenUser: {id: number, isClient: boolean} = JSON.parse((<any>tokenInfo)['sub']);
    const user: Promise<Client | Employee> = tokenUser.isClient ? getClient(tokenUser.id) : getEmployee(tokenUser.id);
    user.then(response => res.json(response)).catch(() =>  res.status(400));
}
