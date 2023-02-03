const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    try {
        const { email, password, id } = req.body;
        const emailExists = await User.findOne({ email });
        if (emailExists) {
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
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
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

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const dbUser = await User.findOne({ email });
        if (!dbUser) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            });
        }

        const validatePassword = bcrypt.compareSync(password, dbUser.password);
        if(!validatePassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            });
        }

        const token = await generateJWT(dbUser.id);

        return res.json({
            ok: true,
            user: dbUser,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contact the admin'
        });
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;

    const token = await generateJWT(uid);

    const user = await User.findById(uid);

    res.json({
        ok: true,
        user,
        token
    });
};

module.exports = {
    crearUsuario,
    login,
    renewToken
}