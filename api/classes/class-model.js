const db = require('../data/db-config')

function getAll() {
    return db('class')
}


module.exports = {
    getAll,
}