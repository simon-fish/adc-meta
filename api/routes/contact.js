/**
 * File: routes/contact.js
 * Desc: routes configuration for manage contact models
 * Author: Prawit Chaivong
 * Date: Oct 04, 2016
 */

var Handlers = require('../handlers/contact');
var Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/api/contact',
        config: {
            tags: ['api', 'contact'],
            description: 'Get contact list',
            notes: 'REST API for get the list of all contacts',
            handler: Handlers.getContactListHandler
        }
    },

    {
        method: 'GET',
        path: '/api/contact/{id}',
        config: {
            tags: ['api', 'contact'],
            description: 'Get contact details',
            handler: Handlers.getContactDetailHandler,
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        }
    },

    {
        method: 'POST',
        path: '/api/contact',
        config: {
            tags: ['api', 'contact'],
            description: 'Create contact',
            handler: Handlers.addContactHandler,
            validate: {
                payload: {
                    name: Joi.string().required(),
                    email: Joi.string().email().required(),
                }
            }
        }
    },

    {
        method: 'PUT',
        path: '/api/contact',
        config: {
            tags: ['api', 'contact'],
            description: 'Update contact',
            handler: Handlers.updateContactHandler,
            validate: {
                payload: {
                    _id: Joi.string().required(),
                    name: Joi.string().required(),
                    email: Joi.string().email()
                },

            }
        }
    },

    {
        method: 'DELETE',
        path: '/api/contact/{id}',
        config: {
            tags: ['api', 'contact'],
            description : 'Delete contact',
            notes : 'Delete contact by contact id',
            handler: Handlers.deleteContactHandler,
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        }
    }

]