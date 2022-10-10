import { validationResult } from 'express-validator';
import HttpError from '../models/error-model.js';


const runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(422).json({
        //     error: errors.array()[0].msg
        // });
        throw new HttpError(errors.array()[0].msg, 422)
    }
    next();
};

export default runValidation;