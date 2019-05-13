import {Dish} from './Dish';

export interface Order {
    idOrder: number;
    date: string;
    fullCost: number;
    idClient: number
    idDepartment: number;
    status: string;
    dishes?: Dish[];
}
