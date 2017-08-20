var User = require('../models/users');
var jwt  = require('jsonwebtoken');
var config = require('../../config');

// RETRIEVE ALL USERS
exports.find = (req, res) => {
    User.find({},(err, users) => {
        if(err) res.status(500).json({'error': err});
        res.json(users);
    });
};

// RETRIEVE ONE USER
exports.findOne = (req, res) => {
    User.findOne({'_id': req.body.id},(err, user) => {
        if(err) res.status(500).json({'error': err});
        res.json(user);
    });
};

exports.signUp = (req, res) => {
    User.findOne({'email': req.body.email},(err, user) => {
        if(err) throw err;
        if(user){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            res.json({
                'success': false,
                'message': 'This email is already taken by another user.'
            });
        }else{
            var newUser = new User();
            newUser.email = req.body.email;
            newUser.nickname = req.body.nickname;
            newUser.password = newUser.generateHash(req.body.password);
            newUser.admin = 0;

            newUser.save((err, user) =>{
                if(err) throw err;
                res.json(user);
            });
        }
    });
}

// AUTHENTICATION 
exports.authenticate = (req, res) => {
    User.findOne({'email': req.body.email},(err, user) => {
        if(err) throw err;
        if(!user){
            res.json({
                'success': false,
                'message': 'Authentication failed. User not found :('
            });
        }else if(user.password != req.body.password){
            res.json({
                'success': false,
                'message': 'Authentication failed. Wrong password :('
            });
        }else{
            var token = jwt.sign(user, config.token.secret,{
                expiresIn: 1440
            });

            res.json({
                'success': true,
                'message': 'Token is yours',
                'token': token
            });
        }
    });
}