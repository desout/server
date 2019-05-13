import {Provider} from "../../models/Provider";
import {addProvider, getProvider, getProviders, updateProvider} from "../../modules/providers.module";
import {responseType} from "../../models/responseType";

export const getProvidersFn = (req, res) => getProviders().then((value: Provider[]) => value ? res.status(200).send(value) : res.status(500));

export const getProviderFn = (req, res) => getProvider(req.params.id).then((value: Provider) => value ? res.status(200).send(value) : res.status(404).send(value));

export const addProviderFn = (req, res) => addProvider(req.body as Provider).then((value: responseType) => value ? res.status(200).send({id: value.insertId}) : res.status(400).send(value));

export const editProviderFn = (req, res) => updateProvider(req.body as Provider).then((value: responseType) => value ? res.status(200).send({id: req.body.idProvider}) : res.status(400).send(value));

