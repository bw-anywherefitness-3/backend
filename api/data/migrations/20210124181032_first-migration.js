

exports.up = async (knex) => {
  await knex.schema
      .createTable('users', (users) => {
      users.increments('user_id')
      users.string('first_name', 200).notNullable()
      users.string('last_name', 200).notNullable()
      users.string('password', 200).notNullable()
      users.string('email', 200).notNullable().unique()
      users.string('role', 200).notNullable()
      users.timestamps(false, true)
      
    })
    .createTable('class', (classes) => {
      classes.increments('class_id')
      classes.string('class_name', 200).notNullable()
      classes.string('type', 200).notNullable()
      classes.string('date', 100).notNullable()
      classes.string('time',100).notNullable()
      classes.string('duration', 200).notNullable()
      classes.string('intensity_level', 200).notNullable()
      classes.string('location', 200).notNullable()
      classes.integer('attendees', 100).notNullable()
      classes.integer('max_size', 100).notNullable()
    })
    .createTable('class_users',(signup) => {
      signup.integer('user_id')
      .notNullable()
      .unsigned()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      signup.integer('class_id')
      .notNullable()
      .unsigned()
      .references('class_id')
      .inTable('class')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    })
}
  

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('class_users')
  await knex.schema.dropTableIfExists('class')
  await knex.schema.dropTableIfExists('users')
}