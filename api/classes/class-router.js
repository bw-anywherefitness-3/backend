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

router.get('/attendees/:class_id', (req, res, next) => {
    Class.countAttendees(req.params.class_id)
    .then(attendees => {
        res.json(attendees.length)
    })
    .catch(next)
})

router.put('/:class_id', restricted, only("instructor") ,(req, res, next) => {
   const { id } = req.params
     Class.getById(id)
     .then(addClass => {
         if(!addClass){
             res.status(404).json({message: "Class does not exist"})
         } else {
             return Class.update(id, req.body)
         }
     })
     .catch(next)
})
    
module.exports = router