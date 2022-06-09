const req = require('express/lib/request');
const propiedadesModel = require ('../models/propiedades')
const tiposModel = require('../models/tipos')
const condicionModel = require('../models/condicion')

class Condicion {
    static async getAllcondiciones(req,res) {
        try{
            const condiciones = await condicionModel.findAll({});
            if (!condiciones) {
              return res.status(404).json({
                status: 404,
                message: "No hay condiciones cargadas en la base de datos",
              });
            }
            return res.json({
              status: 200,
              condiciones: condiciones,
            });
          } catch (error) {
            return res.status(500).json({
              status: 500,
              error,
            });
          }
        }
    }

    module.exports = Condicion;