export interface Employee {
    idEmployee: number;
    firstName: string;
    secondName: string;
    lastName: string;
    login: string;
    password?: string;
    passportData: string;
    dateOfBirth: string;
    role: string;
    salary: number;
    contacts?: string;
    idDepartment: number;
}
