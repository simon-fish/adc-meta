/**
 * File: routes/formula.js
 * Desc: routes configuration for searching and getting formula
 * Author: Prawit Chaivong
 * Date: Oct 10, 2016
 */

var Handlers = require('../handlers/formula');
var Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/api/formula/search/{name}',
        config: {
            tags: ['api', 'formula'],
            description: 'Seach formula by name',
            handler: Handlers.searchFormulaHandler,
            validate: {
                params: {
                    name: Joi.string().required()
                }
            }
        }
    },

    {
        method: 'GET',
        path: '/api/formula/{id}',
        config: {
            tags: ['api', 'formula'],
            description: 'Get specific formula',
            handler: Handlers.getFormulaHandler,
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        }
    },
]