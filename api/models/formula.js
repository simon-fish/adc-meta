/**
 * File: formula.js
 * Desc: Formula data model
 * Author: Prawit Chaivong
 * Date: Sep 29, 2016
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = mongoose.Types;

var CategorySchema = new Schema({
    id: String,
    name: String,
    description: String
},{_id: false});

var FormulaSchema = new Schema({
    id: String,
    name: String,
    label: String,
    description: String,
    category: CategorySchema,
    datasource: {type: Schema.Types.ObjectId, ref: 'DataSource'}
});

module.exports = mongoose.model('Formula', FormulaSchema);