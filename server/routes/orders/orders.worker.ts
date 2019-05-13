import {addOrder, deleteOrder, getOrder, getOrderDishes, getOrders, updateOrder} from "../../modules/orders.module";
import {Order} from "../../models/Order";
import {Dish} from "../../models/Dish";
import {responseType} from "../../models/responseType";


export const getOrdersFn = (req, res) => getOrders().then((value: Order[]) => value ? res.status(200).send(value) : res.status(500));

export const getOrderFn = (req, res) => getOrder(req.params.id).then((value: Order) => value ? res.status(200).send(value) : res.status(404).send(value));

export const addOrderFn = (req, res) => addOrder(req.body as Order).then((value: number) => value ? res.status(200).send({id: value}) : res.status(400).send(value));

export const deleteOrderFn = (req, res) => deleteOrder(req.params.id).then((value: responseType) => value ? res.status(200).send({id: req.params.id}) : res.status(404).send(value));

export const editOrderFn = (req, res) => updateOrder(req.body as Order).then((value: responseType) => value ? res.status(200).send({id: req.body.idOrder}) : res.status(400).send(value));

export const getOrderDishesFn = (req, res) => getOrderDishes(req.params.id).then((value: Dish[]) => value ? res.status(200).send(value) : res.status(404).send(value));
