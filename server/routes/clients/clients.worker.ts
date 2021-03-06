import {
    addClient,
    deleteClient,
    getClient,
    getClientByName,
    getClients,
    updateClient
} from '../../modules/clients.module';
import {Client} from '../../models/Client';
import {responseType} from '../../models/responseType';

export const getClientsFn = (req, res) => getClients().then((value: Client[]) => value ? res.status(200).send(value) : res.status(500));

export const getClientFn = (req, res) => getClient(req.params.id).then((value: Client) => value ? res.status(200).send(value) : res.status(404).send(value));

export const getClientByNameFn = (req, res) => getClientByName(req.params.name).then((value: Client) => value ? res.status(200).send(value) : res.status(404).send(value));

export const addClientFn = (req, res) =>
    getClientByName(req.body.name).then(resp => {
        if (resp[0]) {
            res.status(400).send(`Does name exist`);
        } else {
            addClient(req.body as Client).then((value: responseType) => value ? res.status(200).send({id: value.insertId}) : res.status(400).send(value));
        }
    });

export const deleteClientFn = (req, res) => deleteClient(req.params.id).then((value: responseType) => value ? res.status(200).send({id: req.params.id}) : res.status(404).send(value));

export const editClientFn = (req, res) => updateClient(req.body as Client).then((value: responseType) => value ? res.status(200).send({id: req.body.idClient}) : res.status(400).send(value));
