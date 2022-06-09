const {DataTypes} = require('sequelize');

const connection = require('../conection')

const tiposModel = require('../models/tipos')
const condicionModel = require('../models/condicion')
const imgModel = require('../models/img')


const propiedadModel = connection.define(
    'propiedades',
    {
        nombre:{
            type: DataTypes.STRING
        },
        descripcion:{
            type: DataTypes.STRING
        },
        direccion_mapa:{
            type: DataTypes.STRING
        },
        precio: {
            type: DataTypes.INTEGER
        },
        tipo_id:{
            type: DataTypes.INTEGER
        },
        condicion_id:{
            type: DataTypes.INTEGER
        },
        createdAt:{
            type: DataTypes.TIME
        },
        updatedAt:{
            type: DataTypes.TIME
        }
        

    },
    {timestamps: false}  
);

propiedadModel.belongsTo(tiposModel, {as: 'tipos', foreignKey: 'tipo_id'});
propiedadModel.belongsTo(condicionModel, {as: 'condiciones', foreignKey: 'condicion_id'});

propiedadModel.hasMany(imgModel,{as: 'img', foreignKey: 'id_propiedad'})


module.exports = propiedadModel;