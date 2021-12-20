const db = require('../data/db-config')

function getAll() {
    return db('users')
}
function findBy(filter) {
    return db('users')
    .select('user_id','name', 'password', 'email', 'role')
    .where(filter)

}
function findById(id) {
    return db('users')
        .where('user_id', id)
        .first()
}

function add(user){
    return db('users')
    .insert(user)
    .then(([id]) => findById(id))
}
module.exports = {
    getAll,
    findBy,
    add,
    findById
}