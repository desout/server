import {db} from '../../app';
import {responseType} from '../models/responseType';

export const getImage = (id: number): Promise<Blob> => db.query(`SELECT Photos.photo FROM db.Photos WHERE idPhoto = ${id};`);

export const addImage = (photo: Buffer): Promise<responseType> => {
    return db.query(`INSERT INTO db.Photos (photo) VALUES (?);`, [photo]);
};

export const updateImage = (id: number, photo: Blob): Promise<responseType> => db.query(`UPDATE db.Photos SET photo = ? WHERE idPhoto = ${id};`, [photo]);
