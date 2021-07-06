



class NotAdminError extends Error {
    constructor(message="Not Admin") {
        super(message);
        this.name = 'NotAdminError';
    }
}


module.exports = NotAdminError;