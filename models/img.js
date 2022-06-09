const {DataTypes} = require('sequelize');
const connection = require('../conection')

const imgModel = connection.define(
    'img',
    {
        nombre:{
            type: DataTypes.STRING
        },
        id_propiedad:{
            type: DataTypes.INTEGER
        }
    },
    {timestamps: false},
    {freezeTableName: true}
);

// imgModel.hasMany(propiedadesModel, {as: 'propiedades', foreignKey: 'propiedad_id'});


module.exports = imgModel;