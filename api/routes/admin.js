/**
 * File: routes/admin.js
 * Desc: routes for administrator api
 * Author: Prawit Chaivong
 * Date: Oct 05, 2016
 */

var Handlers = require('../handlers/admin');
var Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/api/admin/upload',
        config: {
            tags: ['api', 'admin', 'metadata'],
            description: 'API for admin to upload file for each individual metadata datasource. e.g., PVA, Estimates',
            handler: Handlers.createDataSourceHandler,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: {
                    file: Joi.any()
                            .meta({swaggerType: 'file'})
                            .required()
                            .description('XML File')
                }
            },
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            }
        }
    },

    {
        method: 'DELETE',
        path: '/api/admin/database',
        config: {
            tags: ['api', 'admin', 'database'],
            description: 'Clear all databases',
            handler: Handlers.redPillHandler,
        }
    }
]