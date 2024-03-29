//carregando modulos
const express = require('express')
//conexa html com o back
const handlebars = require('express-handlebars')
//body parser
const bodyParser = require('body-parser')
//Models Postagem
//armazenando express em uma variavel 
const app = express()

const mongoose = require("mongoose")
//emportando rotas do admin
const admin = require("./routes/admin")

const GetPatrocinador = require("./routes/Patrocinados/GetPatrocinadores")
// usar itens html localizados na pasta
const path = require("path")


//session 
const session = require("express-session")
//flash
const flash = require("connect-flash")
//chamando passport
const passport = require("passport")
require("./config/auth")(passport)
//Mongo Connection Session
const MongoStore = require('connect-mongo')(session)
//Rota de usuarios
const usuarios = require("./routes/usuario")
const router = require('./routes/usuario')
//Patrocinadores

//noticias
require('./models/Noticias')
const Noticias = mongoose.model("noticias")
//Categorias 
require("./models/Categoria")
const Categoria = mongoose.model("categorias")
//Postagens
require("./models/Postagem")
const Postagem = mongoose.model("postagens")
//Usuario
const Usuario = mongoose.model("usuarios")
//Pagamentos

require("./models/Pagamentos")
const Pagamentos = mongoose.model("pagamentos")
//Mercado Pago 
const MercadoPago = require("mercadopago")
//carrinho js
const Cart = require("./models/cart")
//db
const db = require("./config/db")
//Mercado Config 
MercadoPago.configure({
    sandbox: true,
    access_token: "APP_USR-4383300227306599-092419-e351390db9b5810c819a30325b7e4e6c-636981516"

})

//Rotas
app.use('/admin', admin);
app.use("/Patricionador",GetPatrocinador );

//nodemailer
/*
const nodemailer = require("nodemailer")
let transporter = nodemailer.createTransport({
host : "smtp.gmail.com",
port : 465,
secure : true,
auth:{
      user:"douglasmb87@gmail.com",
      pass:"douglas12345678"


}




})

for (var i = 0; i < 30; i++) {
    console.log(i);
    // more statements
 
transporter.sendMail({
from: "Teste User <douglasmb87@gmail.com>",
to:"guilherme.pereira.vital@gmail.com",
subject:"TTeste teste teste testes teste teste teste teste teste tes te stes te"




}).then(message=>{
    console.log(message)
}).catch(err =>{
    console.log(err)
})
}
*/
//teste

//Configuração
//session
app.use(session({
    secret: "teste",
    resave: true,
    saveUninitialized: true,


    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 },


}))
//helpers\
const { eAdmin } = require("./helpers/eAdmin")
//password
app.use(passport.initialize())
app.use(passport.session())
//flash
app.use(flash())
//middleware
app.use((req, res, next) => {
    res.locals.CepValor = req.flash("CepValor")
    res.locals.CepSuccess = req.flash("CepSucess")
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null;
    res.locals.session = req.session;
    next()
})

//area de teste 
/*

const { calcularPrecoPrazo } = require("correios-brasil"); 
 
let  args2 = {
  // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
  sCepOrigem:  "06704255",
  sCepDestino:  "06704315",
  nVlPeso:  "1",
  nCdFormato:"1",
  nVlComprimento:"20",
  nVlAltura: "20",
  nVlLargura:"20",
  nCdServico: "04014  ",
  nVlDiametro: "0",
};
 
calcularPrecoPrazo(args2).then((response) => {
  console.log(response)
  const{Codigo,Valor}= response
  console.log(Valor,Codigo)
 
});
*/
/*
const { rastrearEncomendas } = require('correios-brasil')
 
let  codRastreio = ['OJ915674082BR'] // array de códigos de rastreios
 
rastrearEncomendas(codRastreio).then((response) => {
  console.log(response);
});

*/
/*
const { consultarCep } = require("correios-brasil");
 
// Cep pode ser String ou Number
const cep = "06704255"; // 21770200 , '21770-200', '21770 200'.... qualquer um formato serve
 
consultarCep(cep).then((response) => {
  console.log(response);
});
*/
/*
const { consultarCep } = require("correios-brasil");
const cep = "0000000000"; // 21770200 , '21770-200', '21770 200'.... qualquer um formato serve
 
consultarCep(cep).then((response) => {
  console.log(response);
}).catch((err)=>{

 console.log(err)


})
*/

//body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var exphbs = require('express-handlebars');
const { Store } = require('express-session')
const { parseDate } = require('tough-cookie')
const { RSA_NO_PADDING } = require('constants')
const connectMongo = require('connect-mongo')
var hbs = exphbs.create({

    // Specify helpers which are only registered on this instance.
    helpers: {


        foo: function () { return 'FOO!'; },
        bar: function () { return 'BAR!'; },
        ne: (v1, v2) => { v1 !== v2 }







    }


});




//Handlebars 
app.engine('handlebars', handlebars({ defaultLayout: 'main' }), hbs.engine)
app.set('view engine', 'handlebars')
//moogonse
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://DevsJabinho:3lFFwv7UliQBlde4@cluster0.kk7ls.mongodb.net/Accp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    
    console.log("Banco conectado")


}).catch((error) => {
    console.log("erro ao se conectar ao Banco " + error)

})
//public
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "views/")))


















app.get("/", (req, res) => {

    res.render("Sobre/home")

})








app.get('/produto', (req, res) => {

    const cat = 2
 
 

    
    Postagem.find({ slug: cat}).lean().skip(10).sort({ data: "desc" }).limit(30).then((postagens) => {



     

        if (req.isAuthenticated()) {

            const NomeCliente = req.user.nome
            const Admintrador = req.user.eAdmin







            res.render("index", { postagens: postagens, NomeCliente: NomeCliente, Admintrador: Admintrador })

        } else {
            res.render("index", { postagens: postagens })




        }





    }).catch((error) => {
        req.flash("error_msg", "Houve um erro interno")
    })

})

app.get('/produto1', (req, res) => {

    const cat = 2
    var x  =  0 
 

    
    Postagem.find({ slug: cat}).lean().skip(10).sort({ data: "desc" }).skip(30).limit(30).then((postagens) => {



     

        if (req.isAuthenticated()) {

            const NomeCliente = req.user.nome
            const Admintrador = req.user.eAdmin







            res.render("index", { postagens: postagens, NomeCliente: NomeCliente, Admintrador: Admintrador })

        } else {
            res.render("index", { postagens: postagens })




        }





    }).catch((error) => {
        req.flash("error_msg", "Houve um erro interno")
    })

})


app.get('/produto2', (req, res) => {

    const cat = 2
    var x  =  0 
 

    
    Postagem.find({ slug: cat}).lean().skip(10).sort({ data: "desc" }).limit(30).skip(60).then((postagens) => {



     

        if (req.isAuthenticated()) {

            const NomeCliente = req.user.nome
            const Admintrador = req.user.eAdmin







            res.render("index", { postagens: postagens, NomeCliente: NomeCliente, Admintrador: Admintrador })

        } else {
            res.render("index", { postagens: postagens })




        }





    }).catch((error) => {
        req.flash("error_msg", "Houve um erro interno")
    })

})
app.get('/produto3', (req, res) => {

    const cat = 2
    var x  =  0 
 

    
    Postagem.find({ slug: cat}).lean().skip(10).sort({ data: "desc" }).limit(30).skip(90).then((postagens) => {



     

        if (req.isAuthenticated()) {

            const NomeCliente = req.user.nome
            const Admintrador = req.user.eAdmin







            res.render("index", { postagens: postagens, NomeCliente: NomeCliente, Admintrador: Admintrador })

        } else {
            res.render("index", { postagens: postagens })




        }





    }).catch((error) => {
        req.flash("error_msg", "Houve um erro interno")
    })

})
app.get('/produto4', (req, res) => {

    const cat = 2
    var x  =  0 
 

    
    Postagem.find({ slug: cat}).lean().skip(10).sort({ data: "desc" }).limit(30).skip(120).then((postagens) => {



     

        if (req.isAuthenticated()) {

            const NomeCliente = req.user.nome
            const Admintrador = req.user.eAdmin







            res.render("index", { postagens: postagens, NomeCliente: NomeCliente, Admintrador: Admintrador })

        } else {
            res.render("index", { postagens: postagens })




        }





    }).catch((error) => {
        req.flash("error_msg", "Houve um erro interno")
    })

})















//Postagens
app.get("/postagens/:id", (req, res) => {

    Postagem.findOne({ _id: req.params.id }).lean().then((postagem) => {




        if (postagem) {
            var teste = 0

            if (postagem.categoria == "5f74795b5a9e50f8a15063bc") {
                console.log(postagem.categoria)

                 teste = 1
                console.log("tes1")
             } else {

                teste = 0
                console.log("tes0")
            }

            res.render("postagem/index", { postagem: postagem, teste: teste })

        } else {

            req.flash("error_msg", "Esta postagem não existe")
            res.redirect("/produto")

        }

    }).catch((error) => {
        req.flash("error_msg", "Houve Erro interno " + error)
        res.redirect("/produto")
    })


})
app.get("/categorias", (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render("Categoria/categoria", { categorias: categorias })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro Listar  ")
        res.redirect("/produto")
    })


})

app.get("/categorias/:id", (req, res) => {

    Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
        if (categoria) {
            Postagem.find({ $or: [{ categoria: categoria._id }, { categoria2: categoria._id }] }).lean().then((postagens) => {




                var cao =  0
                    if( categoria._id == "5f850d55f6c54937705e43ef"){

                    cao = 1


                    }else{
                        cao = 0

                    }

                res.render("Categoria/tiposC", { postagens: postagens, categoria:categoria, cao: cao }) 


            })

        } else {
            req.flash("error_msg", "Esta categoria não existe ")
            res.redirect("/produto")

        }



    }).catch((err) => {

        req.flash("error_msg", "Houve um erro ao carregar a pagina desta categoria")
        res.redirect("/produto")

    })

})

app.get("/cep", (req, res) => {

    res.render("Cep/CalcCep")

})



app.post("/calculaFrete", (req, res, next) => {
    const FreteCep = req.body.cep

    console.log(FreteCep)

    const { calcularPrecoPrazo } = require("correios-brasil");

    if (!req.session.cart) {

        return res.redirect("/produto")


    }

    var cart = new Cart(req.session.cart)

    var valorF = 0

    var arr = []

    for (var id in cart.items) {



        arr.push(cart.items[id])

    }

    var quantidade = arr.length

    var x = 0



    // more statements


    const confere = "" + FreteCep + ""; // 21770200 , '21770-200', '21770 200'.... qualquer um formato serve
    const { consultarCep } = require("correios-brasil");
    consultarCep(confere).then((response) => {
        console.log(response);



        for (var i = 0; i < quantidade; i++) {
            const { qtyC } = arr[x]

            const { item: { _id } } = arr[x]
            console.log(_id)
            console.log(qtyC)
            Postagem.findOne({ _id: _id }).lean().then((postagens) => {

                let args4 = {
                    // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
                    sCepOrigem: "06704255",
                    sCepDestino: "" + FreteCep + "",
                    nVlPeso: "" + postagens.peso + "",
                    nCdFormato: "1",
                    nVlComprimento: "" + postagens.comprimento + "",
                    nVlAltura: "" + postagens.altura + "",
                    nVlLargura: "" + postagens.largura + "",
                    nCdServico: "04014  ",
                    nVlDiametro: "0" ,
                };

                calcularPrecoPrazo(args4).then((response2) => {
                    console.log(response2)
                    const { Codigo, Valor, PrazoEntrega } = response2
                    console.log(Valor, Codigo)




                    var comVirgula = Valor;
                    comVirgula = parseFloat(comVirgula.replace(',', '.'));


                    valorF = valorF + comVirgula * qtyC

                    console.log(valorF)
                    var totalR
                    totalR = cart.totalprice + valorF

                    res.render("Compra/Final", { valorF: valorF, products: cart.generateArray(), totalprice: cart.totalprice, totalR: totalR })

                }).catch((err) => {

                    req.flash("error_msg", "Houve um Erro Interno ao calcular o cep")
                    res.redirect("/produto")


                })







            }).catch((err) => {

                req.flash("error_msg", "Houve um erro Interno")



            })




            x++
        }




    }).catch((err) => {


        req.flash("error_msg", "Cep Invalido")
        res.redirect("/produto")

    })







})



app.post('/cep/consulta', (req, res) => {
    const idConsulta = req.body.idConsulta
    Postagem.findOne({ _id: idConsulta }).then((postagens) => {




        const { calcularPrecoPrazo } = require("correios-brasil");

        const cep = req.body.cep
        console.log(cep)

        const confere = "" + cep + ""; // 21770200 , '21770-200', '21770 200'.... qualquer um formato serve
        const { consultarCep } = require("correios-brasil");
        consultarCep(confere).then((response) => {
            console.log(response);




            let args2 = {
                // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
                sCepOrigem: "06704255",
                sCepDestino: "" + cep + "",
                nVlPeso: postagens.peso,
                nCdFormato: postagens.formato,
                nVlComprimento: postagens.comprimento,
                nVlAltura: postagens.altura,
                nVlLargura: postagens.largura,
                nCdServico: "04014  ",
                nVlDiametro: "0",
            };

            calcularPrecoPrazo(args2).then((response2) => {
                console.log(response2)
                const { Codigo, Valor, PrazoEntrega } = response2
                console.log(Valor, Codigo)



                req.flash("CepSucess", PrazoEntrega + "      :Dias")

                req.flash("CepValor", "Valor :" + Valor)
                res.redirect("/postagens/" + idConsulta + "")


            })









        }).catch((err) => {


            req.flash("CepSucess", "Cep Invalido")
            res.redirect("/postagens/" + idConsulta + "")

        })







    })





})

app.post("/add-cart/", (req, res, next) => {

    var quantidade = req.body.qtyQ
    var productId = req.body.id

       if (quantidade == 0 || quantidade == "" || quantidade == null || quantidade == undefined){

quantidade  = 1 







       }


       var cart = new Cart(req.session.cart ? req.session.cart : {});
       Postagem.findById(productId, function (err, product) {
          if (err) {
              return res.redirect("/produto")
          }
          cart.add(product, product.id,quantidade);
          req.session.cart = cart;
          console.log(req.session.cart)
          res.redirect("/shopping-cart")
  
  
  
      })



  

})


app.get("/shopping-cart", (req, res, next) => {

    if (!req.session.cart) {

        return res.render("postagem/carrinho", { products: null })


    }
    //to aq 
    var cart = new Cart(req.session.cart)



    var titulos = []
    var arr = []


    var quantidade = arr.length
    const { calcularPrecoPrazo } = require("correios-brasil");
    var x = 0
    /*
      for (var i = 0; i < quantidade; i++) {
          const { qty } = arr[x]
  
          const { item: { titulo } } = arr[x]
          console.log(titulo)
          console.log(qty)
  
          x++
  
          // more statements
      }
  
      */
    for (var titulo in cart.items) {



        arr.push(cart.items[titulo])

    }



    console.log(arr)

    res.render("postagem/carrinho", { products: cart.generateArray(), totalprice: cart.totalprice })




})


app.post("/buscar", (req, res) => {
    var pesquisa = req.body.pesquisar.toUpperCase()



    let re = new RegExp(`${pesquisa}`,);


    Postagem.find({ titulo: { $all: re } }).lean().then((postagens) => {

        if (postagens) {

            res.render("postagem/busca", { postagens: postagens })

        } else {

            req.flash("error_msg", "Nenhum Objeto Encontrado")
            res.redirect("/produto")

        }





    }).catch()




})

app.get("/remove/:id", (req, res, next) => {


    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {})








    cart.removeItem(productId)
    req.session.cart = cart
    res.redirect("/shopping-cart")


})




app.post("/resposta", (req, res) => {

    var id = req.query.id
    console.log('CREATED')
    setTimeout(() => {
        var filtro = {
            "order.id": id
        }
        MercadoPago.payment.search({
            qs: filtro
        }).then(data => {
            var pagamentosC = data.body.results[0]
            if (pagamentosC != undefined) {



                console.log(pagamentosC.external_reference)
                console.log(pagamentosC.status)
                var idpag = pagamentosC.external_reference
                var statusM = pagamentosC.status
                if (statusM === 'approved') {
                    Pagamentos.findOne({ idPagamento: idpag }).then((pagamentos) => {

                        if (pagamentos) {
                            console.log(pagamentos.IdUsuario)
                            pagamentos.Status = "Pagamento Aprovado, Seu pedido esta sendo Preparado"
                            pagamentos.StatusV = 1
                            pagamentos.save().then(() => {

                                console.log("tmj junto doug fiz a boa do salvamento")


                            })

                        } else {


                            console.log("ohh shit")
                        }



                    })




                }

            } else {

            }
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }, 20000)



    res.send("CREATED")



})

app.post("/Pedido", async (req, res, next) => {
    var ValorTotal2 = req.body.valorFinal
    var Numero = req.body.numero
    var complemento = req.body.complemento
    var observacoes = req.body.observacoes
    const NomeCliente = req.user._id
    var stt = "Analisando"

    var cart = new Cart(req.session.cart)

    var arr = []





    for (var id in cart.items) {



        arr.push(cart.items[id])

    }
    var idPagamentos = "" + Date.now()

    const novoPagamento = {
        idPagamento: idPagamentos,
        valorTotal: req.body.valorFinal,
        frete: req.body.frete,
        Endereco: req.body.end,
        Numero: req.body.numero,
        complemento: req.body.complemento,
        observacoes: req.body.observacoes,
        IdUsuario: req.user._id,
        cart: cart,
        Status: stt,
        cpf: req.body.cpf,
        cidade: req.body.cidade,
        NomeCliente: req.body.nome,
        email: req.user.email


    }












    const dados = {
        items: [
            item = {
                id: idPagamentos,
                title: "Produtos Veterinarios",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(ValorTotal2)
            }
        ],
        payer: {
            email: req.user.email

        },
        external_reference: idPagamentos,
    }
    try {
        var PagamentosF = await MercadoPago.preferences.create(dados)



        new Pagamentos(novoPagamento).save().then(() => {

            console.log(Pagamentos)


        }).catch((err) => {
            console.log("triste" + err)
        })






        return res.redirect(PagamentosF.body.init_point)



    } catch (err) {
        console.log("teste")
        return res.send(err.message)
    }





















})


app.get("/Sobre", (req, res) => {

    res.render("Sobre/sobre2")



})


app.get("/perfil", (req, res, next) => {

    Pagamentos.find({ IdUsuario: req.user._id }, function (err, orders) {

        if (err) {

            return res.write('Error')

        }
        var cart
        orders.forEach(function (order) {
            cart = new Cart(order.cart)

            order.items = cart.generateArray()
        });

        var nome = req.user.nome
        var email = req.user.email


        res.render("Usuarios/Compra", { orders: orders, nome: nome, email: email })
    }).lean();










})


app.get("/vendas", (req, res, next) => {
    var st = 1
    Pagamentos.find({ StatusV: st }, function (err, orders, pag) {

        if (err) {

            return res.write('Error')

        }
        var cart
        orders.forEach(function (order) {
            cart = new Cart(order.cart)

            order.items = cart.generateArray()
        });

        var nome = req.user.nome
        var email = req.user.email


        res.render("Usuarios/VendasA", { orders: orders, nome: nome, email: email })
    }).lean();










})


app.get("/home", (req, res) => {


    res.render("Sobre/home")




})










app.get("/patrocinadores", (req, res) => {

    Patrocinador.find().lean().then((patrocinador) => {

        if (patrocinador) {
            res.render("Sobre/patrocinadores", { patrocinador: patrocinador })

        } else {
            res.render("Sobre/patrocinadores")

        }



    })





})

app.get("/receita", (req, res) => {
    const cat = 1
    Postagem.find({ slug: cat }).lean().then((postagem) => {


        if (postagem) {

            res.render("postagem/Receita", { postagem: postagem })




        } else {





        }




    }).catch((err) => {

        req.flash("error_msg", "Nenhum Produto Cadastrado Nessa Categoria " + err)
        res.redirect("/produto")

    })





})



app.get("/receita/:id", (req, res) => {

    Postagem.findOne({ _id: req.params.id }).lean().then((postagem) => {




        if (postagem) {
            res.render("postagem/ReceitaInfo", { postagem: postagem })

        } else {

            req.flash("error_msg", "Esse Produto Não Existe Mais ")
            res.redirect("/produto")

        }

    }).catch((error) => {
        req.flash("error_msg", "Houve Erro interno ")
        res.redirect("/produto")
    })


})



app.post("/removeVenda", (req, res) => {

    Pagamentos.remove({ _id: req.body.id }).then(() => {


        req.flash("success_msg", "Venda Deletada Deletada Com Sucesso ")
        res.redirect("/vendas")

    }).catch((error) => {

        req.flash("error_msg", "Erro ao deletar a Venda Deletada Com Sucesso " + error)
        res.redirect("/vendas")
    })








})




app.get("/sobrenos", (req, res) => {

    res.render("Sobre/sobrenos")

})






app.get("/pets", (req, res) => {

    res.render("Sobre/pets")

})
app.get('/ntcMostra',(req,res)=>{
Noticias.find().lean().then((ntc)=>{
    res.render('noticia_evt/ntc',{ntc:ntc})

})




})




//rotas Usuario 
app.use("/usuarios", usuarios)









//Outros
const PORT = process.env.PORT || 8081
app.listen(80, () => {

    console.log("Servidor On")
})

