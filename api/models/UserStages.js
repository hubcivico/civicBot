/**
 * UserStages.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        user_id: {
            type: 'integer',
            unique: true
        },
        stage: {
            type: 'string'
        },
        data_type_selected: {
            type: 'string'
        }
    }
};

