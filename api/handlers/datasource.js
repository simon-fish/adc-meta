/**
 * File: handlers/datasource.js
 * Desc: Handlers function to handle datasource request/response
 * Author: Prawit Chaivong
 * Date: Sep 30, 2016
 */

var DataSource = require('../models/datasource');

exports.addDataSourceHandler = function (request, reply){
    var ds = request.payload;

    DataSource.create(ds, function(err, newDs){
        if(err){
            return reply(err).code(404);
        }
        console.log('New data source created' + newDs);
        return reply(newDs).code(201);
    });
}

exports.deleteDataSourceHandler = function(request, reply){

    DataSource.remove({_id: request.params.id}, function(err){
        if (err) {
            console.error(err);
            return reply(err).code(500);
        }
        var Formula = require('../models/formula');
        Formula.remove({datasource: request.params.id}, function(err){
            if (err){
                console.error(err);
                return reply(err).code(500);
            }

            return reply().code(200);
        });
    });
}

exports.updateDataSourceHandler = function(request, reply){
    var ds = request.payload;

    DataSource.findOneAndUpdate({_id: request.payload.id}, ds, function(err, ds){
        if (err){
            console.err(err);
            return reply(err).code(500);
        }
        console.log('Data source updated'+ ds.name);
        return reply(ds).code(201);
    });
}

exports.getDataSourceDetailHandler = function(request, reply){
    DataSource.findOne({_id: request.params.id})
        .populate('contact', '_id name email created modified')
        .exec(function(err, ds){
            if (err){
                console.log(err);
                return reply(err).code(404);
            }
            return reply(ds).code(200);
    });
}

/*
    Front-end shows; Name, Contact Name, Contact Email, created/modified date and number of formulas
*/
exports.getDataSourceListHandler = function(request, reply){

    DataSource.find({})
    .populate('contact', '_id name email created modified')
    .exec(function(err, dss){
        if (err){
            console.log(err);
            return reply(err).code(500);
        }
        var dsList = [];
        dss.forEach(function(ds){
            var item = {
                id: ds._id,
                name: ds.name,
                filename: ds.filename,
                contact: {},
                created: ds.created,
                modified: ds.modified,
                numOfFormulas: ds.count
            };

            if (ds['contact'] != undefined){
                item.contact = ds.contact;
            }

            dsList.push(item);
        });

        return reply(dsList).code(200);
    });
}