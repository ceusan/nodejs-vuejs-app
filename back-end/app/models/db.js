var mongoose = require('mongoose');
var colors = require('colors');
// mongoose.connect('');
var config = require('../../config');

mongoose.connect(config.db.host);

var db = mongoose.connection;

db.on('error', function(err) {
  console.error('✘ CANNOT CONNECT TO MongoDB DATABASE !'.red, config.db.name.blue, err);
});
db.on('disconnected', function() {
  console.log('✘ DISCONNECTED from MongoDB DATABASE !'.red);
});
db.on('parseError', function(err) {
  console.log('✘ parseError... '.red, err);
});
db.on('open', function(err) {
  console.log('✔ CONNECTED TO'.green+' '+config.db.host.green);
});