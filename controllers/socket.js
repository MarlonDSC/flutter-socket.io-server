const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');
const Arrowchat = require('../models/arrowchat');
const { Op } = require('@sequelize/core');

const usuarioConectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    return usuario;
}

const usuarioDesconectado = async (uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    return usuario;
}

// const getMessages = async (payload) => {
//     const users = Arrowchat.findAll({
//         where: {
//             id: {
//                 [Op.eq]: 1
//             }
//         }
//     });

//     console.log(users);
// };

const sendMessage = async (payload) => {
    try {
        const arrowchat = Arrowchat.build({
            from: payload.from,
            to: payload.to,
            message: payload.message,
            sent: payload.sent,
            read: payload.read,
            user_read: payload.user_read,
            direction: payload.direction,
            priority_message_id: payload.priority_message_id,
            type: payload.type,
            url: payload.url,
            size: payload.size,
            filename: payload.filename
        });
        console.log(arrowchat instanceof Arrowchat); // true
        console.log(arrowchat.message); // "Jane"
        await arrowchat.save();
        console.log('Saved to the database!');
        return true;

    } catch (error) {
        return false;
    }
};

const grabarMensaje = async (payload) => {

    /*
        payload: {
            de: '',
            para: '',
            texto: ''
        }
    */

    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }

}



module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje,
    sendMessage
    // getMessages
}


