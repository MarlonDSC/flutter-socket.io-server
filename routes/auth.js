const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validar-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], crearUsuario);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.get(
    '/renew', validateJWT,renewToken
);

module.exports = router;