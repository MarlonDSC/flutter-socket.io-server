const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const crearUsuario = async (req, res = response) => {

    try {
        const { email, password } = req.body;
        const emailExists = await User.findOne({email});
        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'Email is already registered'
            });
        }
        const user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generar mi JWT
        
        res.json({
            ok: true,
            user
        });
    } catch (error) {
        console.log(error);
        console.log(error);
        res.status(500).json({
            ok: true,
            body: req.body
        })
    }
};

module.exports = {
    crearUsuario
}