const router = require('express').Router()
const Class = require('./class-model')

router.get('/', (req, res, next) => {
    Class.getAll()
    .then(classes => {
        res.json(classes)
    })
    .catch(next)
})

module.exports = router