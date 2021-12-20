const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title:{
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    description: { 
        type: String,
        required: false,
        //length: 50
    },
    // relacionamos esta coleccion con la de usuarios
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model('Evento', EventoSchema);