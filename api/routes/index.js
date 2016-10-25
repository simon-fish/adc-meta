var statics = require('./static');
var contact = require('./contact');
var datasource = require('./datasource');
var admin = require('./admin');
var formula = require('./formula');
var user = require('./user');

module.exports = [].concat(statics, contact, 
                    admin, datasource, formula, user);

// TODO: should make this dynamically load all .js from the folder
// instead of adding to this file.