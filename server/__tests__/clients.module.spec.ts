import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import {db} from '../../app';
import { deleteClient, getClient, getClientByName, getClients, updateClient } from '../modules/clients.module';
import { Client } from '../models/Client';

chai.use(chaiAsPromised);
chai.should();
describe('Clients module', function () {
    let stub;
    const results: Client[] = [{idClient: 0, name: 'name', contacts: 'contacts', discount: 10, password: 'password'}];
    beforeEach(function() {
        stub = Sinon.stub(db, 'query');
    });

    afterEach(() => {
        stub.restore();
    });
    it('getClients should return correct data', function () {
        stub.withArgs(`SELECT
    Clients.idClient,
    Clients.name,
    Clients.password,
    Clients.contacts,
    Clients.discount
FROM
    Clients;`).returns(Promise.resolve(results));
        return getClients().should.eventually.become(results);
    });
    it('getClient should return correct data', function () {
        stub.withArgs(`SELECT
    Clients.idClient,
    Clients.name,
    Clients.password,
    Clients.contacts,
    Clients.discount
FROM
    Clients WHERE idClient = 0;`).returns(Promise.resolve(results));
        return getClient(0).should.eventually.become(results);
    });
    it('deleteClient should return correct data', function () {
        stub.withArgs('DELETE FROM Clients WHERE idClient = 0').returns(Promise.resolve(results));
        return deleteClient(0).should.eventually.become(results);
    });
    it('getClientByName should return correct data', function () {
        const args = results[0].name;
        stub.withArgs(`SELECT
    Clients.idClient,
    Clients.name,
    Clients.password,
    Clients.contacts,
    Clients.discount
FROM
    Clients WHERE name = ?`, args).returns(Promise.resolve(results));
        return getClientByName(results[0].name).should.eventually.become(results);
    });

    it('updateClient without password should call correct sql', function () {
        const client = {...results[0]};
        delete client.password;
        const args = [results[0].name, results[0].contacts, results[0].discount];
        stub.withArgs('UPDATE Clients' +
          ' SET' +
          ' name = ?,' +
          ' contacts = ?,' +
          ' discount = ? ' +
          'WHERE idClient =' + results[0].idClient + ';', args).returns(Promise.resolve(results[0].idClient));
        return updateClient(client).should.eventually.become(results[0].idClient);
    });
});
