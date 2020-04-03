const express = require("express")

const bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')

const authConfig = require("../config/auth.json")

const User = require('../models/User')

const router = express.Router();

function gernerateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, // 1dia
    })
}

router.post('/register', async (req,res) => {
    const { email } = req.body;
    try {

        //verificar se ja existe o email
        if(await User.findOne({email}) )
            return res.status(400).send({ error: 'User already exists'}) 

        const user = await User.create(req.body) 

        user.password = undefined // nao retornar o email

        return res.send({user,
          token: gernerateToken ({ id: user.id }),
        })
    }
    catch (err){
        return res.status(400).send({ error: 'Registration failer'})
    }
})


router.post('/authenticate', async (req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email}).select('+password')

    if(!user)
     return res.status(400).send({ error: 'User not found'})

     if(!await bcryptjs.compare(password, user.password)) 
     return res.status(400).send({error:    'Invalid password'})

     user.password = undefined // nao retornar o email

  

     res.send({ user,token: gernerateToken ({ id: user.id }),
    })
})

module.exports = app => app.use('/auth',router)