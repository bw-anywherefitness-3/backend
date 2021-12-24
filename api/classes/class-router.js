const router = require('express').Router()
const Class = require('./class-model')


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
router.post('/', (req, res, next) => {
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

router.put('/:class_id', async (req, res, next) => {
   const classes = await Class.update(req.params.id, req.body)
   res.json(classes)
     try{
         res.json('update class by id')
     } catch (err){
         next(err)
     }
    })
//({status: 400, message: 'unable to update'})

module.exports = router