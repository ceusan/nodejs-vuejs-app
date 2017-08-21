var express = require('express');
var router = express.Router();
var userController = require('../app/controllers/userController');
var app = express();
var config = require('../config');

router.route('/login')
    .post(userController.login);

router.route('/signup')
    .post(userController.signUp);
  

router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.token.secret, function(err, decoded) {      
      if (err) {
        return res.json({'success': false, 'message': 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'Sorry. You have no right to be there.' 
    });
  }
});

router.route('/')
    .get(userController.find);

router.route('/:id')
    .get(userController.findOne);



module.exports = router;
