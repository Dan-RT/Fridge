let mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'food';
let RecipeModel = require('./mongoose/RecipeSchema');


class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        console.log('Database connection...');
        mongoose.connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }

}
module.exports = new Database();