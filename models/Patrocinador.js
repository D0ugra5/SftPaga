const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Patrocinador = new Schema({

nome:{

type:String,
required:true


},
imgPt:{
 type:String,
 required:true

},
descPt:{
    type:String,
    required:true
}





})

mongoose.model("Patrocinador", Patrocinador)