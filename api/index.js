//console.log('texto prueba nodemon');

//creacion del sevidor

const express = require('express');
const conectarDb = require('./config/db')
const cors = require("cors")

const app = express()
conectarDb()
app.use(cors())
app.use(express.json());

app.use('/api', require('./routes/rutas_aplicacion'))
app.use('/uploads', express.static('uploads'));

app.listen(5200, () => {
	console.log('el servidor esta arriba');
})
