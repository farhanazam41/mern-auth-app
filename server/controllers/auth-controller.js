import User from "../models/user-model.js";

export const signUp = (req, res) => { 
    console.log('req body', req.body);

    const { name, email, password, phone } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
    });
    const newUser = new User({ name, email, password, phone });

    newUser.save((err, success) => {
        if (err) {
            console.log('SIGNUP ERROR', err);
            return res.status(400).json({ 
                error: err
            });
        }
        console.log('SIGNUP SUCCESS', success);
        res.status(201).json({
            message: 'Signup success! Please signin.'
        });
    });
}