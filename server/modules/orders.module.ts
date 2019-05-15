import {db} from '../../app';
import {Order} from '../models/Order';
import {addDishByOrder} from './dishes.module';
import {Dish} from '../models/Dish';
import {responseType} from '../models/responseType';

export const getOrders = (): Promise<Order[]> => db.query('SELECT * FROM Orders');

export const getOrder = (id: number): Promise<Order> => db.query(`SELECT * FROM Orders WHERE idOrder = ${id}`);

export const deleteOrder = (id: number): Promise<responseType> => db.query(`DELETE FROM Orders WHERE idOrder = ${id}`);


export const addOrder = (order: Order): Promise<number> => db.query(`INSERT INTO db.Orders
(date,
fullCost,
Clients_idClient,
Departments_idDepartment,
status) VALUES (?);`, prepareOrder(order)).then(res => {
    const orderId: number = <number>res.insertId;
    if (order.dishes) {
        order.dishes.forEach(dish => addDishByOrder(dish.idDish, orderId));
    }

    return Promise.resolve(orderId);
}).catch(res => Promise.reject(res));

export const updateOrder = (order: Order): Promise<responseType> => db.query(`UPDATE db.Orders
SET
date = ?,
fullCost = ?,
Clients_idClient = ?,
Departments_idDepartment = ?,
status = ?
WHERE idOrder = ${order.idOrder};`, prepareOrder(order)[0]);

export const getOrderDishes = (id: number): Promise<Dish[]> => db.query(`SELECT
    Dishes.idDish,
    Dishes.name,
    Dishes.idPhoto,
    Dishes.description,
    Dishes.prepareTime,
    Dishes.Categories_idCategory
FROM
    db.Orders_has_Dishes
        LEFT JOIN
    Dishes ON Dishes_idDish = Dishes.idDish
WHERE
    Orders_has_Dishes.Orders_idOrder = ${id};`);

const prepareOrder = (order: Order) =>
    [[
        order.date,
        order.fullCost,
        order.idClient,
        order.idDepartment,
        order.status
    ]];
