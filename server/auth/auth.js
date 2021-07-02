const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


function createToken(data,secret,config) {
    const token = jwt.sign(data,secret,config);
    return token;
}


module.exports = createToken