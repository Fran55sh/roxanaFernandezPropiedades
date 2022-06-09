const req = require("express/lib/request");
const propiedadesModel = require("../models/propiedades");
const tiposModel = require("../models/tipos");
const condicionModel = require("../models/condicion");

class Tipos {
  static async getAlltipos(req, res) {
    try {
      const tipos = await tiposModel.findAll({});
      if (!tipos) {
        return res.status(404).json({
          status: 404,
          message: "No hay tipos cargados en la base de datos",
        });
      }
      return res.json({
        status: 200,
        tipos: tipos,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  static async postTipo(req, res) {
    const {
      tipo,
     
    } = req.body;

    try {
      const tipoCreated = await tiposModel.create({
        tipo
      });

      return res.status(201).json({
        status: 201,
        message: "tipo created",
        data: tipoCreated.tipo,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

module.exports = Tipos;
