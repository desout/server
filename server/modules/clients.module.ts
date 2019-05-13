import {Client} from '../models/Client';
import {db} from '../../app';
import {responseType} from '../models/responseType';
import {UpdatePasswordUser} from '../models/UpdatePasswordUser';
import {compareSync, hashSync} from 'bcrypt';

export const getClients = (): Promise<Client[]> => db.query(`SELECT
    Clients.idClient,
    Clients.name,
    Clients.password,
    Clients.contacts,
    Clients.discount
FROM
    Clients;`);

export const getClient = (id: number): Promise<Client> => db.query(`SELECT
    Clients.idClient,
    Clients.name,
    Clients.password,
    Clients.contacts,
    Clients.discount
FROM
    Clients WHERE idClient = ${id};`);

export const deleteClient = (id: number): Promise<responseType> => db.query(`DELETE FROM Clients WHERE idClient = ${id}`);

export const getClientByName = (name: string): Promise<Client> => db.query(`SELECT
    Clients.idClient,
    Clients.name,
    Clients.password,
    Clients.contacts,
    Clients.discount
FROM
    Clients WHERE name = ?`, name);

export const addClient = (client: Client): Promise<responseType> => db.query('INSERT INTO Clients (name,' +
    ' password,' +
    ' contacts,' +
    ' discount) VALUES (?)', prepareClient(client));

export const updateClient = (client: Client): Promise<responseType> =>
    client.password ? db.query('UPDATE Clients' +
        ' SET' +
        ' name = ?,' +
        ' password = ?,' +
        ' contacts = ?,' +
        ' discount = ? ' +
        'WHERE idClient =' + client.idClient + ';', prepareClient(client)[0]) :
        db.query('UPDATE Clients' +
            ' SET' +
            ' name = ?,' +
            ' contacts = ?,' +
            ' discount = ? ' +
            'WHERE idClient =' + client.idClient + ';', prepareClientUpdate(client)[0]);

const prepareClientUpdate = (client: Client) => [[
    client.name,
    client.contacts,
    client.discount
]];

const prepareClient = (client: Client) =>
    [[
        client.name,
        hashSync(client.password, 10),
        client.contacts,
        client.discount
    ]];


export const checkUserPassword = (client: { login: string, password: string }): Promise<{ client: Client, isValid: boolean }> =>
    getClientByName(client.login).then((res) => Promise.resolve({
        client: res[0],
        isValid: res[0] ? compareSync(client.password, res[0].password) : false
    }));

export const updatePasswordClient = (client: UpdatePasswordUser): Promise<number> => checkUserPassword({
    login: client.login,
    password: client.oldPassword
}).then(res => {
    if (res.isValid) {
        res.client.password = client.newPassword;
        return updateClient(res.client).then(resDb => Promise.resolve(res.client.idClient));
    } else {
        return Promise.resolve(-1);
    }
});
