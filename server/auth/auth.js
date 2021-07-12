const jwt = require('jsonwebtoken');


function createToken(data,secret,config) {
    const token = jwt.sign(data,secret,config);
    return token;
}


module.exports = createToken