exports.up = async (knex) => {
  await knex.schema
      .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.string('email', 200).notNullable().unique()
      users.string('role', 200).notNullable()
      users.timestamps(false, true)
      
    })
    .createTable('class', (classes) => {
      classes.increments('class_id')
      classes.string('class_name', 200).notNullable()
      classes.string('class_type', 200).notNullable()
      classes.datetime('class_date', {precision: 6 }).notNullable()
      classes.string('duration', 200).notNullable()
      classes.string('intensity_level', 200).notNullable()
      classes.string('location', 200).notNullable()
      classes.integer('attendees', 100).notNullable()
      classes.integer('max_size', 100).notNullable()
    })
}
  

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('class')
  await knex.schema.dropTableIfExists('users')
}