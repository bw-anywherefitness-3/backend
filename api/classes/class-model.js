const db = require('../data/db-config')

function getAll() {
    return db('class')
}
function getById(id) {
    return db('class')
    .where('class_id', id)
    .first()
}
async function add(classes){
    const [newClass] = await db('class')
    .insert(classes, ['class_name', 'type','date', 'time', 'duration', 
        'intensity_level', 'location', 'attendees', 'max_size'])
        return newClass
}
async function update(class_id, changes){
    const classes = await db('class')
    .where('class_id', class_id)
    .update(changes, ['class_name', 'type','date', 'time', 'duration', 
    'intensity_level', 'location', 'attendees', 'max_size'])
    return classes
}

module.exports = {
    getAll,
    getById,
    add,
    update
}