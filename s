[1mdiff --cc app.js[m
[1mindex c569063,65aa48f..0000000[m
[1m--- a/app.js[m
[1m+++ b/app.js[m
[36m@@@ -254,12 -254,12 +254,21 @@@[m [mapp.use('/admin', admin[m
  [m
  [m
  [m
[32m++<<<<<<< HEAD[m
[32m +app.get("/", (req, res) => {[m
[32m +[m
[32m +    res.render("Sobre/home")[m
[32m +[m
[32m +})[m
[32m +[m
[32m++=======[m
[32m+ app.get("/",(req,res)=>{[m
[32m+ [m
[32m+     res.render("Sobre/home")[m
[32m+     [m
[32m+     })[m
[32m+     [m
[32m++>>>>>>> 507eaad8fc2a866c8e49d76786224d86e8c27609[m
  [m
  [m
  [m
[36m@@@ -276,14 -276,14 +285,25 @@@[m [mapp.get('/produto', (req, res) => [m
  [m
  [m
  [m
[32m++<<<<<<< HEAD[m
[32m +    const cat = 2[m
[32m +    Postagem.find({ slug: cat }).lean().sort({ data: "desc" }).limit(20).then((postagens) => {[m
[32m +[m
[32m +[m
[32m +[m
[32m +[m
[32m +[m
[32m +        if (req.isAuthenticated()) {[m
[32m++=======[m
[32m+     const cat =2[m
[32m+     Postagem.find({ slug: cat }).lean().then((postagens)=>{ [m
[32m+ [m
[32m+       [m
[32m+       [m
[32m+       [m
[32m+       [m
[32m+         if (req.isAuthenticated()  ) {[m
[32m++>>>>>>> 507eaad8fc2a866c8e49d76786224d86e8c27609[m
  [m
              const NomeCliente = req.user.nome[m
              const Admintrador = req.user.eAdmin[m
[36m@@@ -292,7 -292,7 +312,11 @@@[m
  [m
  [m
  [m
[32m++<<<<<<< HEAD[m
[32m +[m
[32m++=======[m
[32m+             console.log(Admintrador)[m
[32m++>>>>>>> 507eaad8fc2a866c8e49d76786224d86e8c27609[m
  [m
  [m
              res.render("index", { postagens: postagens, NomeCliente: NomeCliente, Admintrador: Admintrador })[m
[36m@@@ -306,7 -306,7 +330,11 @@@[m
          }[m
  [m
  [m
[32m++<<<<<<< HEAD[m
[32m +[m
[32m++=======[m
[32m+    [m
[32m++>>>>>>> 507eaad8fc2a866c8e49d76786224d86e8c27609[m
  [m
  [m
  [m
[36m@@@ -339,20 -339,7 +367,24 @@@[m [mapp.get("/postagens/:id", (req, res) =[m
  [m
  [m
          if (postagem) {[m
[32m++<<<<<<< HEAD[m
[32m +            var teste = 0[m
[32m +[m
[32m +            if (postagem.categoria == "5f74795b5a9e50f8a15063bc") {[m
[32m +                console.log(postagem.categoria)[m
[32m +[m
[32m +                 teste = 1[m
[32m +                console.log("tes1")[m
[32m +             } else {[m
[32m +[m
[32m +                teste = 0[m
[32m +                console.log("tes0")[m
[32m +            }[m
[32m +[m
[32m +            res.render("postagem/index", { postagem: postagem, teste: teste })[m
[32m++=======[m
[32m+             res.render("postagem/index", { postagem: postagem })[m
[32m++>>>>>>> 507eaad8fc2a866c8e49d76786224d86e8c27609[m
  [m
          } else {[m
  [m
[36m@@@ -362,7 -349,7 +394,11 @@@[m
          }[m
  [m
      }).catch((error) => {[m
[32m++<<<<<<< HEAD[m
[32m +        req.flash("error_msg", "Houve Erro interno " + error)[m
[32m++=======[m
[32m+         req.flash("error_msg", "Houve Erro interno ")[m
[32m++>>>>>>> 507eaad8fc2a866c8e49d76786224d86e8c27609[m
          res.redirect("/produto")[m
      })[m
  [m
[36m@@@ -380,19 -367,12 +416,28 @@@[m [mapp.get("/categorias", (req, res) => [m
  })[m
  [m
  app.get("/categorias/:id", (req, res) => {[m
[32m++<<<<<<< HEAD[m
[32m +[m
[32m +    Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {[m
[32m +        if (categoria) {[m
[32m +            Postagem.find({ $or: [{ categoria: categoria._id }, { categoria2: categoria._id }] }).lean().then((postagens) => {[m
[32m +[m
[32m +[m
[32m +[m
[32m +[m
[32m +[m
[32m +                res.render("Categoria/tiposC", { postagens: postagens, categoria: categoria })[m
[32m +[m
[32m +[m
[32m +[m
[32m++=======[m
[32m+     Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {[m
[32m+         if (categoria) {[m
[32m+             Postagem.find({ categoria: categoria._id }).lean().then((postagens) => {[m
[32m+ [m
[32m+ [m
[32m+                 res.render("Categoria/tiposC", { postagens, postagens, categoria: categoria })[m
[32m++>>>>>>> 507eaad8fc2a866c8e49d76786224d86e8c27609[m
  [m
  [m
              })[m
[36m@@@ -476,11 -456,11 +521,19 @@@[m [mapp.post("/calculaFrete", (req, res, ne[m
  [m
  [m
          for (var i = 0; i < quantidade; i++) {[m
[32m++<<<<<<< HEAD[m
[32m +            const { qtyC } = arr[x][m
[32m +[m
[32m +            const { item: { _id } } = arr[x][m
[32m +            console.log(_id)[m
[32m +            console.log(qtyC)[m
[32m++=======[m
[32m+             const { qty } = arr[x][m
[32m+ [m
[32m+             const { item: { _id } } = arr[x][m
[32m+             console.log(_id)[m
[32m+             console.log(qty)[m
[32m++>>>>>>> 507eaad8fc2a866c8e49d76786224d86e8c27609[m
              Postagem.findOne({ _id: _id }).lean().then((postagens) => {[m
  [m
                  let args4 = {[m
[36m@@@ -508,7 -488,7 +561,11 @@@[m
                      comVirgula = parseFloat(comVirgula.replace(',', '.'));[m
  [m
  [m
[32m++<<<<<<< HEAD[m
[32m +                    valorF = valorF + comVirgula * qtyC[m
[32m++=======[m
[32m+                     valorF = valorF + comVirgula * qty[m
[32m++>>>>>>> 507eaad8fc2a866c8e49d76786224d86e8c27609[m
  [m
                      console.log(valorF)[m
                      var totalR[m
[36m@@@ -567,117 -547,99 +624,206 @@@[m
  [m
  app.post('/cep/consulta', (req, res) => {[m
      const idConsulta = req.body.idConsulta[m
[32m++<<<<<<< HEAD[m
[32m +    Postagem.findOne({ _id: idConsulta }).then((postagens) => {[m
[32m +[m
[32m +[m
[32m +[m
[32m +[m
[32m +        const { calcularPrecoPrazo } = require("correios-brasil");[m
[32m +[m
[32m +        const cep = req.body.cep[m
[32m +        console.log(cep)[m
[32m +[m
[32m +        const confere = "" + cep + ""; // 21770200 , '21770-200', '21770 200'.... qualquer um formato serve[m
[32m +        const { consultarCep } = require("correios-brasil");[m
[32m +        consultarCep(confere).then((response) => {[m
[32m +            console.log(response);[m
[32m +[m
[32m +[m
[32m +[m
[32m +[m
[32m +            let args2 = {[m
[32m +                // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),[m
[32m +                sCepOrigem: "06704255",[m
[32m +                sCepDestino: "" + cep + "",[m
[32m +                nVlPeso: postagens.peso,[m
[32m +                nCdFormato: postagens.formato,[m
[32m +                nVlComprimento: postagens.comprimento,[m
[32m +                nVlAltura: postagens.altura,[m
[32m +                nVlLargura: postagens.largura,[m
[32m +                nCdServico: "04014  ",[m
[32m +                nVlDiametro: postagens.diametro,[m
[32m +            };[m
[32m +[m
[32m +            calcularPrecoPrazo(args2).then((response2) => {[m
[32m +                console.log(response2)[m
[32m +                const { Codigo, Valor, PrazoEntrega } = response2[m
[32m +                console.log(Valor, Codigo)[m
[32m +[m
[32m +[m
[32m +[m
[32m +                req.flash("CepSucess", PrazoEntrega + "      :Dias")[m
[32m +[m
[32m +                req.flash("CepValor", "Valor :" + Valor)[m
[32m +                res.redirect("/postagens/" + idConsulta + "")[m
[32m +[m
[32m +[m
[32m +            })[m
[32m +[m
[32m +[m
[32m +[m
[32m +[m
[32m +[m
[32m +[m
[32m +[m
[32m +[m
[32m +[m
[32m +        }).catch((err) => {[m
[32m +[m
[32m +[m
[32m +            req.flash("CepSucess", "Cep Invalido")[m
[32m +            res.redirect("/postagens/" + idConsulta + "")[m
[32m +[m
[32m +        })[m
[32m++=======[m
[32m+     Postagem.findOne({_id:idConsulta}).then((postagens)=>{[m
[32m+ [m
[32m+   [m
[32m+  [m
[32m+ [m
[32m+     const { calcularPrecoPrazo } = require("correios-brasil");[m
[32m+ [m
[32m+     const cep = req.body.cep[m
[32m+     console.log(cep)[m
[32m+   [m
[32m+     const confere = "" + cep + ""; // 21770200 , '21770-200',