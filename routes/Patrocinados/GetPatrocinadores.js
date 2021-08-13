const express = require('express');

require("../../models/Patrocinador")

const patrocinador = express.Router();

const connect = require("../../connections/Mongo/Connection")

    patrocinador.get("/", (req, res) => {
        connect.connectPatrocinador.find().lean().then((patrocinador) => {
            if (patrocinador) {
                res.render("Sobre/patrocinadores", { patrocinador: patrocinador })
            } else {
                res.render("Sobre/patrocinadores")
            }
        })
    })
    module.exports = patrocinador;