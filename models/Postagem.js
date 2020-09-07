const mongoose = require('mongoose')
const { networkInterfaces } = require('os')
const { Double } = require('bson')
const Schema = mongoose.Schema


const Postagem = new Schema({
    titulo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true

    },
    descricao: {
        type: String,
        required: true



    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    },

    nomeImagem: {

        type: String,
        required: true


    },
    preco: {

        type: Number,

        required: true


    },


    peso: {
        type: Number,
        required: true


    },
    formato: {
        type: Number,
        required: true



    },
    comprimento: {
        type: Number,
        required: true
    },
    altura: {
        type: Number,
        required: true
    },
    largura: {
        type: Number,
        required: true


    },
   
    diametro:{

         type:Number,
         required:true


    }




})

mongoose.model("postagens", Postagem)
