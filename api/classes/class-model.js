const db = require('../data/db-config')

function getAll() {
    return db('class')
}
function getById(id) {
    return db('class')
    .where('class_id', id)
    .first()
}

module.exports = {
    getAll,
    getById
}