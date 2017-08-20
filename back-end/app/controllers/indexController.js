
exports.index = function(req, res){
    var message = {'message':'The api is at http://localhost:3000/api'}
    res.json(message);
};