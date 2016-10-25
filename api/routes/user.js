

var Handlers = require('../handlers/user');
var Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/api/user',
        config: {
            tags: ['api', 'auth'],
            description: 'Create new user',
            handler: Handlers.createUserHandler,
            validate: {
                payload: {
                    username: Joi.string().email().required(),
                    password: Joi.string().required(),
                    firstname: Joi.string(),
                    lastname: Joi.string(),
                }
            }
        }
    },

    {
        method: 'GET',
        path: '/api/user',
        config: {
            tags: ['api', 'auth'],
            description: 'Get User list',
            handler: Handlers.getUserListHandler,
        }
    },

    {
        method: 'POST',
        path: '/api/user/login',
        config: {
            tags: ['api', 'auth'],
            description: 'User login',
            handler: Handlers.loginHandler,
            validate: {
                payload: {
                    username: Joi.string().email().required(),
                    password: Joi.string().required()
                }
            }
        }
    },
]