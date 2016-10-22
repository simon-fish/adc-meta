/**
 * File: contact.js
 * Desc: Contact point data model
 * Author: Prawit Chaivong
 * Date: Sep 29, 2016
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true
    }, 
    email: {
        type: String,
        require: true
    },

    modified: {type: Date, default: Date.now},
    created: {type: Date, default: Date.now},
});

/**
 * Pre save hook: adjust 'modified' field
 */
ContactSchema.pre('save',function(next){
    this.modified = Date.now();
    next();
});

/**
 * Instance methods.
 */


/**
 * Static methods.
 */

module.exports = mongoose.model('Contact', ContactSchema);
