const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

//Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // like a week-ish
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // It's in miliseconds, hence the dramatic change
        httpOnly: true,
        secure: isProduction, // Boolean
        sameSite: isProduction && "Lax",
    });

    return token;
}

const restoreUser = (req, res, next) => {
    // Get that token from the cookie jar
    const { token } = req.cookies;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next()
        }

        try { // try finding the user
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        // If there is no user, clear the cookie that has them logged in
        if (!req.user) res.clearCookie('token');

        return next();
    })
}

// If there is no current user, return an error
const requireAuth = [
    restoreUser,
    function (req, res, next) {
        if (req.user) return next();

        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    },
];

module.exports = { setTokenCookie, restoreUser, requireAuth };