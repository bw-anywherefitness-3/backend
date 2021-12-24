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
    .catch(next({status: 404, message: 'unable to get class' }))
})
//Returns users by class_id
router.get('/signedUp/:id', (req, res, next) => {
    Class.userClass(req.params.id)
    .then(classes => {
        res.json(classes)
    })
    .catch(next({status: 404, message: 'Unable to get users!'}))
})
router.post('/', restricted, only("instructor"), (req, res, next) => {
    Class.add(req.body)
    .then(newClass => {
        res.json(newClass)
    })
    .catch(next({status: 400, message: 'Unable to create class!'}))
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