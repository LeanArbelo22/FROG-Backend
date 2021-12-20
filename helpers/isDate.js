const moment = require('moment');

const isDate = (date) => {
    // date es la variable que le enviamos desde el check start/end
    console.log(date);

    /* if(!date){
        return false;
    } */

    const fecha = moment(date);
    if(fecha.isValid()){
        return true
    }else{
        return false;
    }
};

module.exports = { isDate }