


class UserError extends Error { 
    constructor(message) {
        super(message);
        this.name = 'UserError';
    }
}

class UserLoginError extends UserError {
    constructor(message) {
        super(message);
        this.name = 'UserLoginError';
    }
}



module.exports = UserError;
module.exports = UserLoginError;