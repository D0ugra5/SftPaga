const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
require("../config/auth")
const passport = require("passport")
const nodemailer = require("nodemailer")
const { html } = require('cheerio')
const { route } = require('./admin')


router.get("/registro", (req, res) => {

    res.render("Usuarios/registro")


})



router.post("/registro", (req, res) => {

    var erros = [];

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {

        erros.push({ texto: "Nome invalido" })

    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {

        erros.push({ texto: "E-mail invalido" })

    }
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {

        erros.push({ texto: "senha invalido" })

    }
    if (req.body.senha.length < 4) {

        erros.push({ texto: "Senha muita curta  " })

    }

    if (req.body.senha != req.body.senha2) {

        erros.push({ texto: "As senhas São diferente Tente Novamente " })

    }

    if (erros.length > 0) {

        res.render("usuarios/registro", { erros: erros })

    } else {

        Usuario.findOne({ email: req.body.email }).then((usuario) => {
            if (usuario) {
                req.flash("error_msg", "Email Já Cadastrado")
                res.redirect("/usuarios/registro")

            } else {

                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                   





                })

                bcrypt.genSalt(10, (erro, salt) => {

                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if (erro) {

                            req.flash("error_msg", "Houve um erro durante o salvamento do USuarios")
                            res.redirect("/")
                        }
                        novoUsuario.senha = hash
                        novoUsuario.save().then(() => {
                            req.flash("success_msg", "Usuario Criado com Sucesso !")
                            res.redirect("/")


                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao Criar o Usuario")
                            res.redirect("/usuarios/registro")

                        })
                    })



                })

            }





        }).catch((err) => {

            req.flash("error_msg", "Houve Um erro Interno")
            res.redirect("/")



        })

    }

})
router.get("/login", (req, res) => {
    res.render("Usuarios/login")

})



router.post("/login", (req, res, next) => {
    passport.authenticate("local", {

        successRedirect: "/",
        failureRedirect: "/usuarios/login",
        failureFlash: true

    })(req, res, next)



})



router.get("/logout", (req, res) => {

    req.logOut()
    req.flash("success_msg", "Até Logo Volte Sempre ")
    res.redirect("/")

})







//rota de Recuperar Senha 


router.get("/RecuperarSenha", (req, res) => {

    res.render("Usuarios/Recuperar")

})



router.post("/RecuperarSenha", (req, res) => {

    Usuario.findOne({ email: req.body.email }).then((usuario) => {
        if (usuario) {
            const link = "http://164.90.227.119/usuarios/DefinirSenha/" + usuario._id + ""
            console.log("usuario id " + usuario._id)

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "faustin2424@gmail.com",
                    pass: "jubileudamorte"


                }




            })


            // more statements

            transporter.sendMail({
                from: "Devs Jabinho <faustin2424@gmail.com>",
                to: "" + usuario.email + "",
                subject: "Recuperar Senha Devs Jabinho",
                html: " Para recupera a Senha Click no link  a seguir <a href='" + link + "'>CLIQUE AQUI</a> Seja Bem vindo Novamente"




            }).then(message => {
                console.log(message)
                req.flash("success_msg", "Email Enviado Com Sucesso Verifique Sua caixa De Email ")
                res.redirect("/")
            }).catch(err => {
                console.log(err)
            })



        } else {

            req.flash("error_msg", "Email Não Encontrado")


        }



    })




})




router.get("/DefinirSenha/:id", (req, res) => {

    const id = req.params.id


    res.render("Usuarios/DefinirSenha", { id: id })



})



router.post("/DefinirSenha", (req, res) => {
    var erros = [];
    console.log("teste")






    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {

        erros.push({ texto: "senha invalido" })

    }
    if (req.body.senha.length < 4) {

        erros.push({ texto: "Senha muita curta  " })

    }

    if (req.body.senha != req.body.senha2) {

        erros.push({ texto: "As senhas São diferente Tente Novamente " })

    }

    if (erros.length > 0) {

        res.render("Usuarios/DefinirSenha", { erros: erros })

    } else {
        Usuario.findOne({ _id: req.body.id }).then((usuarios) => {
            if (usuarios) {
                usuarios.senha = req.body.senha


                bcrypt.genSalt(10, (erro, salt) => {

                    bcrypt.hash(usuarios.senha, salt, (erro, hash) => {
                        if (erro) {

                            req.flash("error_msg", "Houve um erro durante o salvamento do USuarios")
                            res.redirect("/")
                        }
                        usuarios.senha = hash
                        usuarios.save().then(() => {
                            req.flash("success_msg", "Senha Alterada !")
                            res.redirect("/")


                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao Mudar de Senha")
                            res.redirect("Usuarios/DefinirSenha")

                        })
                    })



                })

            } else {
                console.log("nao acho")
            }



        }).catch((err) => {
        
           
            req.flash("error_msg", "Houve erro ao definir a senha " + err)
            res.redirect("/")

        })
    }














})




















module.exports = router




