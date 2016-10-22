/**
 * File: handlers/admin.js
 * Desc: Handlers for administrator capabilities
 * Author: Prawit Chaivong
 * Date: Oct 05, 2016
 */

var fs = require('fs');
var xml2js = require('xml2js');

var DataSource = require('../models/datasource');
var Formula = require('../models/formula');
var Contact = require('../models/contact');


/**
 * Probably unused.
 */
exports.reloadDataSource = function(request, reply){
    var ds = request.params.id;

    DataSource.findOne({_id: request.params.id}, function(err, ds){
        if (err){
            console.error(err);
            return reply(err).code(500);
        }
        // Get datasource xml file.
        var meta = ds.metadata;
    });
}


/**
 * BEWARE: This will clear all data in our database.
 * use with yourown risk
 */
exports.redPillHandler = function(request, reply){
    Formula.remove({}, function(err){
        if (err) throw err;
    });

    Contact.remove({}, function(err){
        if (err) throw err;
    });

    DataSource.remove({}, function(err){
        if (err) throw err;
    });

    return reply().code(200);
}



exports.createDataSourceHandler = function(request, reply){
    var data = request.payload;
    var content = '';
    var fname = data.file.hapi.filename;

    console.log(fname + 'is being uploaded and processed');

    
    if (data.file) {

        data.file.on('error', function(err){
            console.error(err);
            return reply(err).code(501);
        })
        .on('data', function(buff){
            content += buff.toString();
        })
        .on('end', function(){

           var parser = xml2js.Parser();
           var formula_cnt = 0;
           parser.parseString(content, function(err, result){

               // Create metadata for datasouces in this xml file.

               if (typeof result.d != 'object'){
                   console.error('Format is not supported');
                   return reply('format error').code(400);
               }

               var meta = {
                   id: result.d.$.id,
                   dname: result.d.$.n,
                   description: result.d.$.d,
                   filename: fname
               };
               
               dsList = [];

               // paranoid!! some document does not contact element 'c'
               if (typeof result.d.c == 'object'){
                   // Options for findOneAndUpdate.
                   var options = { upsert: true, new: true, setDefaultOnInsert: true};
                   result.d.c.forEach(function(c){

                       // Category detail. Embded this info into formula items.
                       var category = {
                           id: c.$.id,
                           name: c.$.n,
                           description: c.$.d
                       }

                       if (c.i instanceof Array){
                           /**
                            * Update/Create datasource first.
                            * TODO: kinda lousy job here to make a datasource query for each formula items
                            *       this should be improved for better performance
                            */
                            c.i.forEach(function(i){
                                var item = {
                                    id: i.$.id,
                                    label: i.$.l,
                                    name: i.$.n,
                                    description: i.$.d,
                                    category: category
                                }; // Formula item

                                var ds = {
                                    name: i.$.s,
                                    metadata: meta,
                                    $inc: {count: 1}
                                }; // Data Source

                                /** FindOneAndUpdate datasouce
                                 *  And then insert formula 
                                 */
                                DataSource.findOneAndUpdate({name: ds.name}, ds, options,
                                    function(err, datasource){
                                        if (err){
                                            // If some problem happen with datasource update, just return 500
                                            console.error(err);
                                            return reply(err).code(500);
                                        }

                                        // Insert item to formula collection
                                        // update datasource id first.
                                        item.datasource = datasource._id;
                                        Formula.findOneAndUpdate({name: item.name}, item, options, function(err, formula){
                                            if (err){
                                                console.error(err);
                                                return reply(err).code(500);
                                            }

                                            formula_cnt++;
                                        });
                                        
                                    }); // DataSource
                    
                
                            }); // c.i.forEach                          
                       }

                   }); // datasource.d.c.forEach
                   
                   console.log(formula_cnt + ' formulas have been processed');
                   return reply({'formulas': formula_cnt}).code(201);
                }

           });
       });
    }
    else {
        console.error('there is no file presented');
        return reply().code(400);
    }

}