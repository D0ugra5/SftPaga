const initalizePassport = require('../config/auth')
const passport = require('passport')
const { userInfo } = require('os')


initalizePassport(passport,
    email =>users.find(user =>user.email ===email),
    id=>users.find(user =>user.id === id)
    
    
    )