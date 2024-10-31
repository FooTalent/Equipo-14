// models/usuario.js
const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        telefono: {
            type: String,
            required: true,
        },
        clave: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("usuario", UsuarioSchema);
