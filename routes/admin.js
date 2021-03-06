const express = require("express")
const router = express.Router()
const multer = require("multer")
const mongoose = require("mongoose")
const path = require("path")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
const { eAdmin } = require("../helpers/eAdmin")
require('../models/Patrocinador')
const Patrocinador = mongoose.model("Patrocinador")
//
require('../models/Noticias')
const Noticias = mongoose.model("noticias")
//
require('../models/Postagem')
const Postagem = mongoose.model("postagens")

router.use(express.static(path.join(__dirname, "public")))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname))

  }

})
const upload = multer({ storage })

//rota index admin
router.get('/', eAdmin, (req, res) => {

  res.render("admin/index")
})
//rota post 
router.get('/post', eAdmin, (req, res) => {

  res.render("pagina de post ")

})
//rota categoria 
router.get('/categorias', eAdmin, (req, res) => {
  Categoria.find().sort({ date: 'desc' }).lean().then((categorias) => {

    res.render('admin/categorias', { categorias: categorias })

  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao listar categorias")
    res.redirect("/admin")
  })

})

//rota formulario categoria 

router.get('/categorias/add', eAdmin, (req, res) => {
  res.render('admin/addcategoria')
})


router.post('/categorias/nova', eAdmin, upload.single("Foto"), (req, res) => {

  var erros = []
  if (!req.body.Nome || typeof req.body.Nome == undefined || req.body.Nome == null) {
    erros.push({ texto: "Nome Invalido" })
  }

  if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
    erros.push({ texto: "Slug invalido" })


  }
  if (req.body.Nome.length < 2) {
    erros.push({ texto: "Nome da Categoria muito Curto" })

  }
  if (erros.length > 0) {
    res.render("admin/addcategoria", { erros: erros })
  } else {
    const novaCategoria = {
      nome: req.body.Nome,
      slug: req.body.slug,
      imgCat: req.file.filename,
    }
    new Categoria(novaCategoria).save().then(() => {
      req.flash("success_msg", "categoria criada com sucesso!")
      console.log("o Itens Foi salvo Com o Sucesso")
      res.redirect("/admin/categorias")
    }).catch((error) => {
      req.flash("error_msg", "Erro ao Criar Categoria")
      console.log("erro ao salvar", +error)
      res.redirect("/admin")
    })
  }




})
router.get('/categorias/edit/:id', eAdmin, (req, res) => {
  Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {

    res.render("admin/EditCategoria", { categoria: categoria })

  }).catch((error) => {
    req.flash("error_msg", "Esta Categoria não Existe")
    res.redirect("/admin/categorias")
  })








})
router.post('/categorias/edit', upload.single("Foto"), eAdmin, (req, res) => {
  Categoria.findOne({ _id: req.body.id }).then((categoria) => {

    categoria.nome = req.body.Nome
    categoria.slug = req.body.slug
    categoria.imgCat = req.file.filename
    categoria.save().then(() => {
      req.flash("success_msg", "Categoria Editada Com Sucesso!")
      res.redirect("/admin/categorias")
    }).catch((error) => {

      req.flash("error_msg", "Erro ao editar categoria" + error)
      res.redirect("/admin/categorias")


    })
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao editar a categoria" + err)
    res.redirect("/admin/categorias")
  })
})


router.post("/categorias/deletar", eAdmin, (req, res) => {
  Categoria.remove({ _id: req.body.id }).then(() => {
    req.flash("success_msg", "Categoria  Deletada Com Sucesso ")
    res.redirect("/admin/categorias")
  }).catch((error) => {
    req.flash("error_msg", "Houve Um erro ao Deletar  a Mensagem " + error)
    res.redirect("/admin/categorias")
  })
})

router.post("/patrocinador/deletar", eAdmin, (req, res) => {
  Patrocinador.remove({ _id: req.body.id }).then(() => {

    req.flash("success_msg", "Patrocinador  Deletada Com Sucesso ")
    res.redirect("/admin/mostra")





  }).catch((error) => {
    req.flash("error_msg", "Houve Um erro ao Deletar  a Mensagem " + error)
    res.redirect("/admin/mostra")
  })








})
router.get("/patrocinador/edit/:id", (req, res) => {

  Patrocinador.findOne({ _id: req.params.id }).lean().then((patrocinador) => {



    res.render("admin/editPatrocinador", { patrocinador: patrocinador })







  })






})

router.post("/patri/edit2",upload.single("Foto"), (req,res)=>{

Patrocinador.findOne({_id:req.body.id}).then((patri)=>{

patri.nome = req.body.nome
patri.descPt = req.body.descPt
patri.link = req.body.link
patri.imgPt = req.file.filename


patri.save().then(() => {

  req.flash("success_msg", "Seu Patrocinador foi Alterado com Sucesso")
  res.redirect("/admin/mostra")

}).catch((err) => {

  req.flash("error", "Patrocinador nao foi editado .... Falha" + err)
  res.redirect("/admin/mostra")




})






})





} )




router.get("/postagens", eAdmin, (req, res) => {
  Postagem.find().lean().populate("categoria").sort({ data: "desc" }).then((postagens) => {
    res.render("admin/postangens", { postagens: postagens })
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao listar as postagens")
    res.redirect("/admin")
  })

})

router.get("/postagens/add", eAdmin, (req, res) => {
  Categoria.find().lean().then((categoria) => {
    res.render("admin/addPostagens", { categoria: categoria })


  }).catch((err) => {
    req.flash("error_msg", "Ocorreu um erro ao cadsatrar o formulario")
    res.redirect("/admin")


  })



})
router.post("/postagens/nova", upload.single("Foto"), (req, res) => {

  var erro = []

  if (req.body.categoria == "0") {
    erros.push({ texto: "Categoria Invalida, Registre Uma Categoria ou Selecione uma existente " })

  }
  if (erro.length > 0) {
    res.render("admin/addPostagens", { erros: erros })

  } else {
    const novaPostagem = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      conteudo: req.body.conteudo,
      slug: req.body.slug,
      categoria: req.body.categoria,
      categoria2: req.body.categoria2,
      preco: req.body.preco,
      nomeImagem: req.file.filename,

      peso: req.body.peso,
      formato: req.body.formato,
      comprimento: req.body.comprimento,
      altura: req.body.altura,
      largura: req.body.largura,
      diametro: req.body.diametro




    }
    new Postagem(novaPostagem).save().then(() => {
      req.flash("success_msg", "Postagem Criada com Sucesso !")
      res.redirect("/admin/postagens")
    }).catch((err) => {
      req.flash("error_msg", "houve um erro durante o salvamento" + err)
      res.redirect("/admin/postagens")

    })


  }

})


router.get("/postagens/edit/:id", eAdmin, (req, res) => {
  Postagem.findOne({ _id: req.params.id }).lean().sort({ data: "desc" }).then((postagem) => {
    Categoria.find().lean().then((categoria) => {

      res.render("admin/editpostagens", { categoria: categoria, postagem: postagem })

    })



  }).catch((err) => {
    req.flash("error_msg", "Houve  um erro ai carregar  o formulario de edição")
    res.redirect("/admin/postagens")



  })





})


router.post("/postagem/edit", upload.single("Foto"), eAdmin, (req, res) => {

  Postagem.findOne({ _id: req.body.id }).then((postagem) => {

    postagem.titulo = req.body.titulo
    postagem.slug = req.body.slug
    postagem.descricao = req.body.descricao
    postagem.conteudo = req.body.conteudo
    postagem.categoria = req.body.categoria
    postagem.nomeImagem = req.file.filename
    postagem.preco = req.body.preco
    postagem.peso = req.body.peso
    postagem.formato = req.body.formato
    postagem.comprimento = req.body.comprimento
    postagem.altura = req.body.altura
    postagem.largura = req.body.largura
    postagem.diametro = req.body.diametro
    postagem.categoria2 = req.body.categoria2

    postagem.save().then(() => {

      req.flash("success_msg", "Postagem editada com Sucesso")
      res.redirect("/admin/postagens")

    }).catch((err) => {

      req.flash("error", "Postagem editada com Falha" + err)
      res.redirect("/admin/postagens")




    })

  }).catch((err) => {

    req.flash("error_msg", "houve um erro ao editar  o formulario" + err)
    res.redirect("/admin/postagens")

  })



})

router.get("/postagens/deletar/:id", eAdmin, (req, res) => {

  Postagem.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Postagem deletada com Sucesso")
    res.redirect("/admin/postagens")


  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao Salvar ")
    res.redirect("/admin/postagens")



  })

})

router.get("/patrocinador", (req, res) => {
  res.render("admin/Patri")


})

router.post("/patri", eAdmin, upload.single("imgPt"), (req, res) => {

  const novoPatri = {
    nome: req.body.nome,
    descPt: req.body.descPt,
    imgPt: req.file.filename,
    link: req.body.link


  }

  new Patrocinador(novoPatri).save().then(() => {

   
    res.redirect("/admin/mostra")


  })




})


router.get('/ntcCad',(req,res)=>{


res.render('admin/addntc')


})

router.post('/ntcCad2', upload.single("Foto"),(req,res)=>{

const novaNoticia={
nome : req.body.Nome,
Descript:req.body.descr,
imgNtc:req.file.filename



}

new Noticias (novaNoticia).save().then(()=>{

 req.flash('success_msg',"Noticias/Evento Salva com Sucesso ")
 res.redirect('/admin/ntc')



}).catch((err)=>{

  req.flash('success_msg',"Noticias/Evento Não foram Salvas Erro " +err)
  res.redirect('/ntcCad')



})


  
})





router.get("/ntc" ,(req,res)=>{
Noticias.find().lean().then((noticias)=>{


  res.render('admin/NtcAd',{noticias:noticias})







})



})


router.get("/mostra", eAdmin, (req, res) => {
  Patrocinador.find().lean().then((patri) => {

    res.render("admin/Mpatri", { patri: patri })

  })



})


router.get('/ntcDelete/:id', (req,res)=>{

Noticias.remove({_id:req.params.id}).then(()=>{

req.flash('success_msg',"A noticia Foi apagada")
res.redirect("/admin/ntc")

})



})

router.get('/ntcEdit/:id', (req,res)=>{

  Noticias.findOne({_id : req.params.id}).lean().then((ntc)=>{
  
  if(ntc){
  
  res.render('admin/editntc',{ntc:ntc})
  
  
  
  }
  
  
  
  
  })
})

router.post("/editntcc",upload.single("Foto"), (req,res)=>{
var teste = req.body.id

 
Noticias.findOne({ _id: req.body.id}).then((ntc)=>{

  ntc.nome = req.body.nome

  ntc.Descript = req.body.descr
  ntc.imgNtc = req.file.filename
  
  
  
  ntc.save().then(()=>{
  
  
  req.flash("success_msg","Salvamento Concluido ")
  res.redirect('/admin/ntc')
  
  
  
  
  }).catch(()=>{
  
    req.flash("error_msg","ocorreu um erro ao aplicar o salvamento Contante a equipe  ")
  res.redirect('/admin/ntc')
  
  })

  












})




})

  
  
  
  
  
  


//exports para outros models
module.exports = router