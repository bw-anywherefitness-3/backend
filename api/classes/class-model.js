const db = require('../data/db-config')

function getAll() {
    return db('class')
}
function getById(id) {
    return db('class')
    .where('class_id', id)
    .first()
}
//Counts how many clients have signed up
function countAttendees(class_id) {
const clients = db('class_users')
.where('class_id', class_id)
return clients
}

async function add(classes){
    const [newClass] = await db('class')
    .insert(classes, ['class_name', 'type','date', 'time', 'duration', 
        'intensity_level', 'location', 'attendees', 'max_size'])
        return newClass
}
// async function update(id, changes){
//     const classes = await db('class')
//     .update(changes, 'class_name', 'type','date', 'time', 'duration', 
//     'intensity_level', 'location', 'attendees', 'max_size')
//     .where('class_id', id)
//     return classes
// }
const update = async (id, classes) => {
    await db('class').where('class_id', id)
                     .update(classes)
            return getById
}


//Add user_id to class_id
async function addToClass(class_id, user_id){
    const signUp = await db('class_users')
    .insert('class_id','user_id', class_id, user_id)
    // .insert('class_id', 'user_id')
    return signUp
}

//Returns class by class_id with user_ids linked to one class
function userClass(id) {
   const classes = db('class_users as cu')
    .select('c.class_id', 'c.class_name', 'c.date',
    'c.time','u.user_id', 'u.first_name', 'u.last_name')
    .from('class_users as cu')
    .leftOuterJoin('class as c', 'cu.class_id', 'c.class_id')
    .leftOuterJoin('users as u', 'cu.user_id', 'u.user_id')
    .where('c.class_id', id)
    return classes
}

module.exports = {
    getAll,
    getById,
    countAttendees,
    add,
    update,
    addToClass,
    userClass,
}