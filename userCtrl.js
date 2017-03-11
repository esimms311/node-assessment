var app = require('./server.js');
const users = require('./users.js');

var userCtrl = {
  readAll: function(){
    return users.find();
  },

  findUserById: function(userId){
    var userById = users.findOne('id', userId);
    if(userById) {
      return userById;
    }
  },

  getAdmins: function(){
    var admins = users.find('type', 'admin');
    if(admins) {
      return admins;
    }
    else {
      return null;
    }
  },

  getNonAdmins: function(){
    var nonadmins = users.find('type', 'user');
    if(nonadmins) {
      return nonadmins;
    }
    else {
      return null;
    }
  },

  getUsersByFavorite: function(fav) {
     var allUsers = users.find();
     var favUsers = allUsers.filter(function(user) {
       if (user.favorites.toString().indexOf(fav) >= 0) {
         return user;
       }
     });
     if (favUsers) {
       return favUsers;
     } else {
       return null;
     }
   },

  getUsersByAgeLimit: function(age){
    var allUsers = users.find();
    var underAge = allUsers.filter(function(user){
      if(user.age < age) {
        return user;
      }
    });
      if(underAge) {
        return underAge;
      }
      else {
        return null;
      }
  },

  findUserByQuery: function(term, value){
    if(term === "last_name" || term === "email") {
      var queryResponse = users.find(term, value);
      if(queryResponse) {
        return queryResponse;
      }
      else {
        return null;
      }
    } else {
      var queryResponse = users.find(term, value);
      if(queryResponse) {
        return queryResponse;
      }
      else {
        return null;
      }
    }
  },

  createUser: function(newUser){
    var addedUser = users.add(newUser);
    if(addedUser) {
      return addedUser;
    }
    else {
      return null;
    }
  },

  updateUser: function(userId, obj){
    users.update('id', userId, obj);
    var updatedUser = users.findOne('id', userId);
    if(updatedUser) {
      return updatedUser;
    }
    else {
      return null;
    }
  },

  removeUser: function(userId){
    var deletedUser = users.findOne('id', userId);
    users.remove('id', userId);
    if(deletedUser){
      return deletedUser;
    }
    else {
      return null;
    }
  }
}

module.exports = userCtrl;
