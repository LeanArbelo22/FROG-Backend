const {response} = require('express');
const Evento = require('../models/Evento');
const { userLogin } = require('./auth')

const getEvento = async (req, res = response) => {
    const evento = await Evento.find();
    res.json({ message: "Eventos del calendario:",
    user: req.name,
    evento
    })
};

const crearEvento = async (req, res = response) => {
    console.log(req.body);

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        await evento.save();

        res.status(200).json({
            message: "Evento creado",
            user: req.name,
            title: evento.title,
            //start: evento.start,
            //end: evento.end,
            notes: evento.description
        })
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el evento",
            error
        })
    }
};

const actualizarEvento = async (req, res = response) => {
    res.json({ message: 'Evento actualizado satisfactoriamente'})
};

const eliminarEvento = async (req, res = response) => {
    res.json({ message: 'Evento eliminado satisfactoriamente'})
};

module.exports = {
    getEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}