

var User = require('../models/user');
var JWT = require('jsonwebtoken');
var Config = require('../config').config;

exports.createUserHandler = function(request, reply){
    var user = request.payload;

    User.create(user, function(err, newUser){
        if (err){
            console.error(err);
            return reply(err).code(401);
        }
        return reply(newUser).code(201)
    });
}

exports.loginHandler = function(request, reply){
    var login = request.payload;

    console.log('User login: '+ login.username);
    User.findOne({username: login.username}, function(err, user){
        if (err){
            console.error(err);
            return reply(err).code(500);
        }

        if (!user){
            var errMsg = "User does not exist"
            console.log(errMsg + " [" + login.username + "]" );
            return reply(errMsg).code(404); // Not found
        }

        user.comparePassword(login.password, function(err, isMatch){
            if (err){
                console.error(err);
                return reply(err).code(500);
            }
            if(!isMatch){
                console.log("Login failed" + login.username);
                return reply("Incorrect Password").code(403);
            }
            else{
                var obj = user.toObject();
                delete obj.password;
                var signedToken = {
                    token: JWT.sign(obj, Config.Secret)
                }
                return reply(signedToken).code(200);
            }
        });
    });
}

exports.getUserListHandler = function(request, reply){
    User.find({}, 'username firstname lastname', function(err, users){
        if (err){
            console.error(err);
            return reply(err).code(500);
        }
        var userList = [];
        users.forEach(function(user){
            userList.push(user);
        });

        return reply(userList).code(200);
    });
}