const router = require('express').Router()
const User = require('./user-model')

router.get('/', (req, res, next) => {
    User.getAll()
    .then(users => {
        res.json(users)
    })
    .catch(next)
})
router.get('/:id', (req, res, next)=> {
User.findById(req.params.id)
.then(user => {
    res.json(user)
})
.catch(next)
 })


router.post('/', (req, res, next) => {
    User.add(req.body)
    .then(newUser => {
        res.status(201).json(newUser)
    })
    .catch(next)
})

module.exports = router