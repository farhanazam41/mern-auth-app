import pkg from 'express-jwt'

const { expressjwt } = pkg;

export const requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
});
