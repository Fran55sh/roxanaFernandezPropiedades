
const propiedadesModel = require("../models/propiedades");
const tiposModel = require("../models/tipos");
const condicionModel = require("../models/condicion");
const imgModel = require("../models/img");

class Propiedades {

  static async getPropiedadesByQuery(req, res) {
    try {
     
      const size = parseInt(req.query.size)
      const condicion = parseInt(req.query.condicion)
      const tipo = parseInt(req.query.tipo)

      const propiedadesQuery = await propiedadesModel.findAndCountAll({

        distinct: true,
        limit: size,
        offset: (req.query.page)*size,
        where:{
          condicion_id: condicion,
          tipo_id : tipo
        },
        include: [
          {
            model: tiposModel,
            as: "tipos",
          },
          {
            model: condicionModel,
            as: "condiciones",
        
          },
          {
            model: imgModel,
            as: "img",
          }
        ]
      });
      
      if (!propiedadesQuery) {
        return res.status(404).json({
          status: 404,
          message: "No hay propiedades cargadas en la base de datos",
        });
      }
      return res.json({
        status: 200,
        data: propiedadesQuery,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  static async getLastAdded(req, res) {
    try {
      
      const propiedades = await propiedadesModel.findAndCountAll({
        limit: 3,
        order: [ [ 'updatedAt', 'DESC' ]],
        include: [
          {
            model: tiposModel,
            as: "tipos",
          },
          {
            model: condicionModel,
            as: "condiciones",
        
          },
          {
            model: imgModel,
            as: "img",
          }
        ]
      });
      
      if (!propiedades) {
        return res.status(404).json({
          status: 404,
          message: "No hay propiedades cargadas en la base de datos",
        });
      }
      return res.json({
        status: 200,
        data: propiedades,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  static async postPropiedades(req, res) {
    const { img, nombre, descripcion, price, tipo_id, condicion_id } = req.body;
    try {
      const createPropiedad = await propiedadesModel.create({
        img,
        nombre,
        descripcion,
        price,
        tipo_id,
        condicion_id,
      });
      return res.status(201).json({
        status: 201,
        message: `Propiedad ${createPropiedad.nombre} creada`,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

module.exports = Propiedades;
