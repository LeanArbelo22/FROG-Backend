// JSON WEB TOKEN
//const res = require('express/lib/response');
const jwt = require('jsonwebtoken');

const generarToken = (uid, name) =>{

    return new Promise((resolve, reject) =>{

        const payload = { uid, name };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) =>{
            if(err){
                console.log(err);
                reject('Error generando token');
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarToken
}
