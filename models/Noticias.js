const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const Noticias = new Schema({

    nome:
    {

        type: String,
        required: true,

    },
    Descript:
    {
        type: String,
        required: true,
    },
    date:
    {
        type: Date,
        default: Date.now()
    },
    imgNtc:{

        type:String,
        required:true
    }


})
mongoose.model("noticias", Noticias)