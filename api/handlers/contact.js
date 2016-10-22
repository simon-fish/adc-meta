/**
 * File: handlers/contact.js
 * Desc: Handlers function to handle contact request/response
 * Author: Prawit Chaivong
 * Date: Oct 04, 2016
 */

var Contact = require('../models/contact');


exports.addContactHandler = function(request, reply){
    var contact = request.payload;

    Contact.create(contact, function(err, newContact){
        if(err){
            console.error(err);
            return reply(err).code(404);
        }
        return reply(newContact).code(201);
    });
};

exports.deleteContactHandler = function(request, reply){
    var query = Contact.findById(request.params.id);

    query.exec(function(err, contact){
        if(err){
            console.err(err);
            return reply(err).code(500);
        }

        if (!contact){
            return reply({'errMsg': 'Contact does not exist'}).code(404);
        }

        query.remove(function(err){
            if(err){
                console.err(err);
                return reply(err).code(500);
            }
            return reply().code(200);
        });
    });
};

exports.updateContactHandler = function(request, reply){
    var contact = request.payload;

    Contact.findOneAndUpdate({_id: request.payload._id}, contact, function(err, newContact){
        if (err){
            console.err(err);
            return reply(err).code(500);
        }
        console.log('Contact updated: '+ newContact._id);
        return reply(newContact).code(201);
    });
};

exports.getContactDetailHandler = function(request, reply){
    Contact.findOne({_id: request.params.id}, function(err, contact){
        if (err){
            console.err(err);
            return reply(err).code(404);
        }
        return reply(contact).code(200);
    });
};

exports.getContactListHandler = function(request, reply){
    Contact.find({}, function(err, contacts){
        if (err){
            console.err(err);
            return reply(err).code(500);
        }

        var contactList = [];
        contacts.forEach(function(contact){
            contactList.push(contact);
        });
        return reply(contactList).code(200);
    });
};