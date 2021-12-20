exports.seed = async function (knex) {

    await knex("users")
    .insert([
      { name: "Hermione Granger",
        password: "1234",
        email: "test@test.com",
        role: "instructor" 
    },
      { name: "Harry Potter",
        password: "1234",
        email: "new@test.com",
        role: "client" 
    }
    ]),
  await knex("class")
    .insert({
      class_name: 'Spin Class',
      class_type: 'cycling', 
      class_date: "2021-12-20 10:23:54+07",
      duration: "60 min",
      intensity_level: "easy",
      location: 'the gym',
      attendees: 2,
      max_size: 35,
    })
}

