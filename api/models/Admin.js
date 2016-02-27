/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


// We don't want to store password with out encryption
var bcrypt = require('bcrypt');

module.exports = {

    attributes: {

        user_id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            required: true,
            autoIncrement: true
        },

        email: {
            type: 'email',
            required: true,
            unique: true // Yes unique one
        },

        encryptedPassword: {
            type: 'string'
        },

        isLogged: {
            type: 'boolean',
            defaultsTo: false
        },
        status: {
            type: 'boolean',
            defaultsTo: false
        },
        deleted: {
            type: 'boolean',
            defaultsTo: false
        },

        // We don't wan't to send back encrypted password either
        toJSON: function () {
            var obj = this.toObject();
            delete obj.encryptedPassword;
            return obj;
        }
    },

    // Here we encrypt password before creating a User
    beforeCreate: function (values, next) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(values.password, salt, function (err, hash) {
                if (err) return next(err);
                values.encryptedPassword = hash;
                next();
            })
        })
    },

    comparePassword: function (password, user, cb) {
        bcrypt.compare(password, user.encryptedPassword, function (err, match) {
            if (err) cb(err);
            if (match) {
                cb(null, true);
            } else {
                cb(err);
            }
        })
    }

};

