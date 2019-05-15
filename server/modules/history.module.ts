import {db} from '../../app';
import {DeliveryHistoryItem} from '../models/DeliveryHistoryItem';
import {responseType} from '../models/responseType';

export const getHistory = (): Promise<DeliveryHistoryItem[]> => db.query(`SELECT DeliveryHistory.count,
    DeliveryHistory.cost,
    DeliveryHistory.date,
    DeliveryHistory.Providers_idProvider,
    DeliveryHistory.Ingredients_idIngredient
FROM db.DeliveryHistory;
`);

export const getHistoryByProvider = (id: number): Promise<DeliveryHistoryItem> => db.query(`SELECT DeliveryHistory.count,
    DeliveryHistory.cost,
    DeliveryHistory.date,
    DeliveryHistory.Providers_idProvider,
    DeliveryHistory.Ingredients_idIngredient
FROM db.DeliveryHistory WHERE Providers_idProvider = ${id}`);


export const addHistoryElement = (item: DeliveryHistoryItem): Promise<responseType> => {
    console.log(item);
    return db.query(`INSERT INTO db.DeliveryHistory
(count,
cost,
date,
Providers_idProvider,
Ingredients_idIngredient)
VALUES
(?);`, prepareHistoryItem(item));
};

export const updateHistoryElement = (item: DeliveryHistoryItem): Promise<responseType> => db.query(`UPDATE db.DeliveryHistory
SET
count = ?,
cost = ?,
date = ?,
Providers_idProvider = ?,
Ingredients_idIngredient = ?
WHERE id= ${item.id};`, prepareHistoryItem(item)[0]);

const prepareHistoryItem = (el: DeliveryHistoryItem) =>
    [[
        el.count,
        el.cost,
        el.date,
        el.idProvider,
        el.idIngredient
    ]];
