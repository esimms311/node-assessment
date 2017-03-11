var express = require('express');
var bodyParser = require('body-parser');

var app = module.exports = express();
app.use(bodyParser.json());

var userCtrl = require('./userCtrl');

app.get('/api/users', function(req, res) {
  if(req.query.favorites){
    res.status(200).json(userCtrl.getUsersByFavorite(req.query.favorites));
  } else if (req.query.age){
    res.status(200).json(userCtrl.getUsersByAgeLimit(req.query.age));
  } else if(req.query.lastname){
    res.status(200).json(userCtrl.findUserByQuery(req.query.lastname));
  } else if(req.query.Email){
    res.status(200).json(userCtrl.findUserByQuery(req.query.Email));
  } else {
    res.status(200).json(userCtrl.readAll());
  }
});

app.get('/api/users/:userId', function(req, res) {
  var userById = userCtrl.findUserById(req.params.userId);
  res.status(200).json(userById);
});

app.get('/api/admins', function(req, res){
  res.status(200).json(userCtrl.getAdmins());
});

app.get('/api/nonadmins', function(req, res) {
  res.status(200).json(userCtrl.getNonAdmins());
});

app.put('/api/users/:userId', function(req, res) {
  var updatedUser = userCtrl.updateUser(req.params.userId, req.body);
  res.status(200).json(updatedUser);
});

app.post('/api/users', function(req, res){
  res.status(200).json(userCtrl.createUser(req.body));
});

app.delete('/api/users/:id', function(req, res){
  var deletedUser = userCtrl.removeUser(req.params.id);
  res.status(200).json(deletedUser);
});

//
//
// app.listen(3000, function(){
//   console.log("So far so good");
// });
