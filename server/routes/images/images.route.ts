import * as express from 'express';
import {
    getImageFn, updateImageFn, uploadImageFn
} from './images.worker';
import {checkToken} from '../../verification/checkToken';
import multer = require('multer');

export const imagesRouter = express.Router();

const upload = multer({ dest: `./uploads` });

imagesRouter.put('/upload', checkToken, upload.single('photo'), uploadImageFn);

imagesRouter.get('/:id', getImageFn);

imagesRouter.post('/:id', checkToken, updateImageFn);
