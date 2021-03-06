'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log('errori', err, info);
        if (err || !user) {
            return res.status(422).json({
                message: 'Something is not right',
                user: user,
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.status(401).json({
                    message: 'Unauthorized',
                    user: user,
                });
            }
            // generate a signed json web token with the contents of user object and return it in the response
            console.log('jwt', user);
            const token = jwt.sign(user, 'qwe123');
            return res.json({user, token});
        });
    })(req, res);

};

module.exports = {
    login,
};