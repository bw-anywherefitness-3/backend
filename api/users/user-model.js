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

async function add(user){
    const [newUser] = await db('users')
                        .insert(user, ['name','password','email', 'role'])
                        return newUser
}
module.exports = {
    getAll,
    findBy,
    add,
    findById
}