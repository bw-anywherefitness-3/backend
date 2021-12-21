exports.seed = async function (knex) {

    await knex("users")
    .insert([
      { first_name: "Hermione",
        last_name: "Granger",
        password: "1234",
        email: "test@test.com",
        role: "instructor" 
    },
      { first_name: "Harry",
        last_name: "Potter",
        password: "1234",
        email: "new@test.com",
        role: "client" 
    }
    ]),
  await knex("class")
    .insert({
      class_name: 'Spin Class',
      type: 'cycling', 
      date: "12/21/2021",
      time: '3:00 pm',
      duration: "60 min",
      intensity_level: "easy",
      location: 'the gym',
      attendees: 2,
      max_size: 35,
    })
}


