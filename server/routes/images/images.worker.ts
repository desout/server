import {responseType} from '../../models/responseType';
import {addImage, getImage, updateImage} from '../../modules/images.module';
import * as fs from 'fs';

export const getImageFn = (req, res) => getImage(req.params.id).then((value: Blob) => value ? res.status(200).send(value) : res.status(404).send(value));

export const uploadImageFn = (req, res) => {
    const img = req.file;
    fs.readFile(img.path, (err, data) => {
        addImage(data).then((value: responseType) => value ? res.status(200).send({id: value.insertId}) : res.status(404).send(value));
    });
};

export const updateImageFn = (req, res) => updateImage(req.params.id, req.body as Blob).then((value: responseType) => value ? res.status(200).send({id: req.params.id}) : res.status(404).send(value));
