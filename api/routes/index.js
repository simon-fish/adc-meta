var statics = require('./static');
var contact = require('./contact');
var datasource = require('./datasource');
var admin = require('./admin');
var formula = require('./formula');

module.exports = [].concat(statics, contact, 
                    admin, datasource, formula);

// TODO: should make this dynamically load all .js from the folder
// instead of adding to this file.