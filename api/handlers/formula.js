/**
 * File: handlers/formula.js
 * Desc: Handlers function to search and get specific formula
 * Author: Prawit Chaivong
 * Date: Oct 10, 2016
 */

var Formula = require('../models/formula');

exports.searchFormulaHandler = function(request, reply){
    var query = request.params.name;

    // Get all formula that have name contain the input query strings
    // Options: ignore cases
    Formula.find({"name": {"$regex": query, "$options": "i"}}, 
    function(err, formulas){
        if(err){
            console.error(err);
            return reply(err).code(500);
        }

        var formulaList = [];
        formulas.forEach(function(formula){
            formulaList.push(formula);
        });

        return reply(formulaList).code(200);
    });
};

exports.getFormulaHandler = function(request, reply){
    
    Formula.findOne({_id: request.params.id}, function(err, formula){
        if (err){
            console.error(err);
            return reply(err).code(500);
        }
        return reply(formula).code(200);
    });
}