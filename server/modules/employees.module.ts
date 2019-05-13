import {db} from '../../app';
import {Employee} from '../models/Employee';
import {responseType} from '../models/responseType';
import {UpdatePasswordUser} from '../models/UpdatePasswordUser';
import {compareSync, hashSync} from 'bcrypt';

export const getEmployees = (): Promise<Employee[]> => db.query(`SELECT Employees.idEmployee,
    Employees.firstName,
    Employees.secondName,
    Employees.lastName,
    Employees.login,
    Employees.passportData,
    Employees.dateOfBirth,
    Employees.role,
    Employees.salary,
    Employees.contacts,
    Employees.Departments_idDepartment
FROM db.Employees;`);

export const getEmployee = (id: number): Promise<Employee> => db.query(`SELECT Employees.idEmployee,
    Employees.firstName,
    Employees.secondName,
    Employees.lastName,
    Employees.login,
    Employees.passportData,
    Employees.dateOfBirth,
    Employees.role,
    Employees.salary,
    Employees.contacts,
    Employees.Departments_idDepartment
FROM db.Employees WHERE idEmployee = ${id}`);

export const deleteEmployee = (id: number): Promise<responseType> => db.query(`DELETE FROM Employees WHERE idEmployee = ${id}`);


export const addEmployee = (employee: Employee): Promise<responseType> => db.query(`INSERT INTO db.Employees
(firstName,
secondName,
lastName,
login,
password,
passportData,
dateOfBirth,
role,
salary,
contacts,
Departments_idDepartment)
VALUES (?);`, prepareEmployee(employee));

export const updateEmployee = (employee: Employee): Promise<responseType> =>
    employee.password?
        db.query(`UPDATE db.Employees
SET
firstName = ?,
secondName = ?,
lastName = ?,
login = ?
password = ?,
passportData = ?,
dateOfBirth = ?,
role = ?,
salary = ?,
contacts = ?,
Departments_idDepartment = ?
WHERE idEmployee = ${employee.idEmployee};`, prepareEmployee(employee)[0]):
        db.query(`UPDATE db.Employees
SET
firstName = ?,
secondName = ?,
lastName = ?,
login = ?
passportData = ?,
dateOfBirth = ?,
role = ?,
salary = ?,
contacts = ?,
Departments_idDepartment = ?
WHERE idEmployee = ${employee.idEmployee};`, prepareEmployeeUpdate(employee)[0]);

export const getEmployeeByName = (name: string): Promise<Employee> => db.query(`SELECT Employees.idEmployee,
    Employees.password,
    Employees.firstName,
    Employees.secondName,
    Employees.lastName,
    Employees.login,
    Employees.password,
    Employees.passportData,
    Employees.dateOfBirth,
    Employees.role,
    Employees.salary,
    Employees.contacts,
    Employees.Departments_idDepartment
FROM db.Employees WHERE login = ?;`, name);

const prepareEmployeeUpdate = (employee: Employee) =>
    [[
        employee.firstName,
        employee.secondName,
        employee.lastName,
        employee.login,
        employee.passportData,
        employee.dateOfBirth,
        employee.role,
        employee.salary,
        employee.contacts,
        employee.idDepartment
    ]];

const prepareEmployee = (employee: Employee) =>
    [[
        employee.firstName,
        employee.secondName,
        employee.lastName,
        employee.login,
        hashSync(employee.password, 10),
        employee.passportData,
        employee.dateOfBirth,
        employee.role,
        employee.salary,
        employee.contacts,
        employee.idDepartment
    ]];

export const checkEmployeePassword = (employee: { login: string, password: string }): Promise<{ employee: Employee, isValid: boolean }> =>
    getEmployeeByName(employee.login).then((res) => {
        return Promise.resolve({
            employee: res[0],
            isValid: res[0] ? compareSync(employee.password, res[0].password) : false
        });
    });

export const updatePasswordEmployee = (employee: UpdatePasswordUser): Promise<number> => checkEmployeePassword({
    login: employee.login,
    password: employee.oldPassword
}).then(res => {
    if (res.isValid) {
        res.employee.password = employee.newPassword;
        return updateEmployee(res.employee).then(resDb => Promise.resolve(res.employee.idEmployee));
    } else {
        return Promise.resolve(-1);
    }
});
