import {db} from '../../app';
import {Provider} from '../models/Provider';
import {responseType} from '../models/responseType';

export const getProviders = (): Promise<Provider[]> => db.query(`SELECT Providers.idProvider,
    Providers.contractInfo
FROM db.Providers;`);

export const getProvider = (id: number): Promise<Provider> => db.query(`SELECT Providers.idProvider,
    Providers.contractInfo
FROM db.Providers WHERE idProvider = ${id};`);

export const deleteProvider = (id: number): Promise<responseType> => db.query(`DELETE FROM db.Providers WHERE idProvider = ${id}`);

export const addProvider = (provider: Provider): Promise<responseType> => db.query(`INSERT INTO db.Providers
(contractInfo)
VALUES
(?);`, prepareProvider(provider));

export const updateProvider = (provider: Provider): Promise<responseType> => db.query('UPDATE db.Providers' +
    ' SET' +
    ' contractInfo = ?' +
    ' WHERE Providers_idProvider = ' + provider.idProvider + ';', prepareProvider(provider)[0]);

const prepareProvider = (provider: Provider) =>
    [[
        provider.contractInfo
    ]];
