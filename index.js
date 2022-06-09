require("dotenv").config();
const express = require("express");
const cors = require("cors");

const propiedadesController = require("./controllers/Propiedades");
const condicionController = require("./controllers/Condicion");
const tiposController = require("./controllers/Tipos");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get("/api/propiedades", propiedadesController.getPropiedadesByQuery);
app.get("/api/propiedades/last", propiedadesController.getLastAdded);
app.post("/api/propiedades", propiedadesController.postPropiedades);

app.get("/api/condicion", condicionController.getAllcondiciones);

app.get("/api/tipos", tiposController.getAlltipos);
app.post("/api/tipos", tiposController.postTipo);

app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});

// app.listen();
