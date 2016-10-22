/**
 * File: datasource.js
 * Desc: Data source models. e.g., PVA, Estimates
 * Author: Prawit Chaivong
 * Date: Sep 29, 2016
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MetaDataSchema = new Schema({
    id: String,
    dname: String,
    description: String,
    filename: String
},{_id: false});


var DataSourceSchema = new Schema({
    name: String,
    contact: {type: Schema.Types.ObjectId, ref: 'Contact'},
    metadata: MetaDataSchema,
    count: {type: Number, default: 0},

    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
});


/**
 * Pre-save hook: adjust 'modified' field
 */
DataSourceSchema.pre('save', function(next){
    this.modified = Date.now();
    next();
});

/**
 * Instance methods.
 */



/**
 * Static methods.
 */


module.exports = mongoose.model('DataSource', DataSourceSchema);