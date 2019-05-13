import {addHistoryElement, getHistory, getHistoryByProvider, updateHistoryElement} from "../../modules/history.module";
import {DeliveryHistoryItem} from "../../models/DeliveryHistoryItem";
import {responseType} from "../../models/responseType";

export const getHistoryFn = (req, res) => getHistory().then((value: DeliveryHistoryItem[]) => value ? res.status(200).send(value) : res.status(500));

export const getProviderHistoryFn = (req, res) => getHistoryByProvider(req.params.id).then((value: DeliveryHistoryItem) => value ? res.status(200).send(value) : res.status(404).send(value));

export const addProviderHistoryFn = (req, res) => addHistoryElement(req.body as DeliveryHistoryItem).then((value: responseType) => value ? res.status(200).send({id: value.insertId}) : res.status(400).send(value));

export const editProviderHistoryFn = (req, res) => updateHistoryElement(req.body as DeliveryHistoryItem).then((value: responseType) => value ? res.status(200).send({id: req.body.idProvider}) : res.status(400).send(value));
