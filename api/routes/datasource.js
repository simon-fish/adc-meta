/**
 * File: routes/datasource.js
 * Desc: routes configuration for manage datasource models
 * Author: Prawit Chaivong
 * Date: Sep 30, 2016
 */

var dsHandler = require('../handlers/datasource');
var Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/api/datasource',
        config: {
            tags: ['api', 'datasource'],
            description: 'Get datasource list',
            notes: 'REST API for get the list of all datasources',
            handler: dsHandler.getDataSourceListHandler
        }
    },

    {
        method: 'GET',
        path: '/api/datasource/{id}',
        config: {
            tags: ['api', 'datasource'],
            description: 'Get detail of any specific datasource',
            handler: dsHandler.getDataSourceDetailHandler,
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        }
    },

    {
        method: 'DELETE',
        path: '/api/datasource/{id}',
        config: {
            tags: ['api', 'datasource'],
            description: 'Delete datasource by id',
            notes: 'Delete datasource by id along with all formulas which belong to this datasource',
            handler: dsHandler.deleteDataSourceHandler,
            validate:{
                params: {
                    id: Joi.string().required()
                }
            }
        }
    },

    {
        method: 'POST',
        path: '/api/datasource',
        config: {
            tags: ['api', 'datasource'],
            description: 'Create new data source',
            handler: dsHandler.addDataSourceHandler,
            validate: {
                payload: {
                    name: Joi.string().required(),
                    contact: Joi.string().required(),
                    
                }
            }
        }
    },

    {
        method: 'PUT',
        path: '/api/datasource',
        config: {
            tags: ['datasource', 'api'],
            description: 'Modify datasource',
            notes: 'Modify/Update datasource by given id, mostly provide for change contact',
            handler: dsHandler.updateDataSourceHandler,
            validate: {
                payload: {
                    id: Joi.string().required(),
                    contact: Joi.string(),
                }
            }
        }
    }

]
