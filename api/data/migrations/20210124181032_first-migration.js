exports.up = async (knex) => {
  await knex.schema
    .createTable('roles', (roles) => {
      roles.increments('role_id')
      roles.string('role_name').notNullable()
    })
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.string('email', 200).notNullable().unique()
      users.timestamps(false, true)
      users.integer('role')
           .unsigned()
           .references('roles.role_id')
           .onDelete('RESTRICT')
           .onUpdate('RESTRICT')
           .defaultTo(2)
    })
    .createTable('instructor', (instructor) => {
      instructor.increments('class_id')
      instructor.string('class_name', 200).notNullable()
      instructor.string('class_type', 200).notNullable()
      instructor.datetime('class_date', {precision: 6 }).notNullable()
      instructor.string('duration', 200).notNullable()
      instructor.string('intensity_level', 200).notNullable()
      instructor.string('location', 200).notNullable()
      instructor.integer('attendees', 100).notNullable()
      instructor.integer('max_size', 100).notNullable()
    })
}
  

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('instructor')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('roles')
}