// controllers/usuarioController.js
const usuarioModel = require("../models/usuario");

// Función para crear usuario (Registro)
exports.crearUsuario = async (req, res) => {
    console.log(req.body);
    try {
        const usuarioData = new usuarioModel(req.body);
        await usuarioData.save();
        res.status(201).send({ msg: "Usuario registrado exitosamente", usuario: usuarioData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un problema con el registro");
    }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarioData = await usuarioModel.find();
        res.json(usuarioData);
    } catch (error) {
        console.error(error);
        res.status(404).send("No se encontró ningún usuario");
    }
};

// Obtener usuario por email (para login)
exports.obtenerUsuarioXEmail = async (req, res) => {
    try {
        const usuarioData = await usuarioModel.findOne({ email: req.body.email });
        if (!usuarioData) {
            return res.status(404).send({ msg: 'Usuario no encontrado' });
        }
        if (usuarioData.clave !== req.body.clave) {
            return res.status(401).send({ msg: 'Clave incorrecta' });
        }
        res.status(200).send({ msg: "Ingreso exitoso", usuario: usuarioData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Ocurrió un problema inesperado");
    }
};

// Obtener usuario por ID
exports.obtenerUsuario = async (req, res) => {
    try {
        const usuarioData = await usuarioModel.findById(req.params.id);
        if (!usuarioData) {
            return res.status(404).send({ msg: 'Usuario no encontrado' });
        }
        res.status(200).send(usuarioData);
    } catch (error) {
        console.error(error);
        res.status(404).send("No se encontró ningún usuario");
    }
};

// Eliminar usuario por ID
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioData = await usuarioModel.findById(req.params.id);
        if (!usuarioData) {
            return res.status(404).send("No se encontró el usuario");
        }
        await usuarioModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(404).send("No se encontró ningún usuario");
    }
};
