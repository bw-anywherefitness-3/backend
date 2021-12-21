const router = require('express').Router()
const Class = require('./class-model')

const { restricted, only } = require("../auth/auth-middleware")

router.get('/', (req, res, next) => {
    Class.getAll()
    .then(classes => {
        res.json(classes)
    })
    .catch(next)
})
router.get('/:id', (req, res, next) => {
    Class.getById(req.params.id)
    .then(classes => {
        res.json(classes)
    })
    .catch(next)
})
router.post('/', restricted, only("instructor"), (req, res, next) => {
    Class.add(req.body)
    .then(newClass => {
        res.json(newClass)
    })
    .catch(next)
})
router.put('/classes/:class_id', (req, res, next) => {
    Class.update(req.params.class_id, req.body)
    .then(updateClass => {
        res.json(updateClass)
    })
    .catch(next)
})
    
module.exports = router