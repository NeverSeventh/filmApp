const getDb = require('../db');
const db = getDb.getDb();

const films = [
    ['Godfather', 'the best'],
    ['The room', 'the worst'],
    ['Godfather 2', 'what the actual'],
    ['Space Jam',''],
    ['Haikyuu','get in the car Shinji'],
    ['Eva','']
]

films.forEach(el => {
    db.query('INSERT INTO films (title,description) values (?,?)',el);
});