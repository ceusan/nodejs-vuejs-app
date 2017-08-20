var User = require('../models/users');
var jwt  = require('jsonwebtoken');
var config = require('../../config');

// RETRIEVE ALL USERS
exports.find = (req, res) => {
    User.find({},(err, users) => {
        if(err) res.status(500).json({'error': err});
        return res.json(users);
    });
};

// RETRIEVE ONE USER
exports.findOne = (req, res) => {
    User.findOne({'_id': req.body.id},(err, user) => {
        if(err) res.status(500).json({'error': err});
        return res.json(user);
    });
};

// USER LOCAL REGISTRATION 
exports.signUp = (req, res) => {
    User.findOne({'email': req.body.email},(err, user) => {
        if(err) throw err;
        if(user){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            return res.json({
                'success': false,
                'message': 'This email is already taken by another user.'
            });
        }else{
            var newUser = new User();
            newUser.email = req.body.email;
            newUser.username = req.body.username;
            newUser.password = newUser.generateHash(req.body.password);
            newUser.admin = 0;

            newUser.save((err, user) =>{
                if(err) throw err;
                return res.json(user);
            });
        }
    });
}

// USER LOGIN 
exports.login = (req, res) => {
    User.findOne({'email': req.body.email},(err, user) => {
        if(err) throw err;
        if(!user){
            res.json({
                'success': false,
                'message': 'Authentication failed. User not found.'
            });
        }else if(!user.validPassword(req.body.password)){
            res.json({
                'success': false,
                'message': 'Authentication failed. Wrong password :('
            });
        }else{
            var token = jwt.sign(user, config.token.secret,{
                expiresIn: 1440
            });
            
            return res.json({
                'success': true,
                'message': 'Welcome home.',
                'token': token,
                'user': user.username
            });
        }
    });
}



/* 

exports.forgotPassword = function (req, res){
 	var random = Common.encrypt(randomstring.generate({length: 5, charset: 'alphabetic'}));
    User.findUserUpdate({username: req.body.username}, {password: random}, function(err, user) {
        if (!err) {
            if (user === null){
                return res.send(Boom.forbidden("invalid username"));
            }
            else{
                Common.sentMailForgotPassword(user);
                return res.send("password is send to registered email id");
            }
        } else {       
            return res.send(Boom.badImplementation(err));
         }
    })
}

*/