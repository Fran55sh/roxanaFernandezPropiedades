const {DataTypes} = require('sequelize');

const connection = require('../conection')

const condicionModel = connection.define(
    'condiciones',
    {
        condicion: {
            type: DataTypes.STRING
        }
    },
    {timestamps: false},
    {freezeTableName: true}
);

module.exports = condicionModel;