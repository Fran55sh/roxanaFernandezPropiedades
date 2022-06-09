const {DataTypes} = require('sequelize');

const connection = require('../conection')

const tiposModel = connection.define(
    'tipos',
    {
        tipo: {
            type: DataTypes.STRING
        }
    },
    {timestamps: false},
    {freezeTableName: true}
);

module.exports = tiposModel;