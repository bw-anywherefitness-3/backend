const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const classesRouter = require('./classes/class-router')
const userRouter = require('./users/user-router')

//function getAllUsers() { return db('users') }

//async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
 // const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
  //return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
//}

const authRouter = require('./auth/auth-router');

const server = express()

// server.use(express.static(path.join(__dirname, '../frontend/anytime-fitness/src')))

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/classes', classesRouter)
server.use('/api/users/', userRouter)

server.use("/api/auth", authRouter)

// server.get('/api/users', async (req, res) => {
//   res.json(await getAllUsers())
// })

// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })

server.get('/', (req, res) => {
  res.json("server up")
  // res.sendFile(path.join(__dirname, '../frontend/anytime-fitness/src', 'index.html'))
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server
