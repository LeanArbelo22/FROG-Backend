const {response} = require('express');

const getEvento = async (req, res = response) => {
    const evento = await Evento.find()
                                .populate('user', 'name');

    res.json({ 
        message: "Eventos del calendario:",
        user: req.name,
        evento
    })
};

const crearEvento = async (req, res = response) => {
    console.log(req.body);

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

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

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                message: 'No existe un evento vinculado a ese ID',
                eventoId
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                message: 'No tienes los privilegios para editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true });

        res.json({
            message: "Evento actualizado correctamente",
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'No fue posible actualizar el evento',
            error
        });
    }
};

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                message: 'No existe un evento vinculado a ese ID',
                eventoId
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                message: 'No tienes los privilegios para eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete( eventoId );

        res.json({ 
            message: "Evento eliminado correctamente"
         });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "El evento no pudo eliminarse",
            error
        });
    }

};

module.exports = {
    getEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}