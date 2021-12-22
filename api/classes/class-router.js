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
router.post('/', only("instructor"), (req, res, next) => {
    Class.add(req.body)
    .then(newClass => {
        res.json(newClass)
    })
    .catch(next)
})
router.put('/:class_id', only,(req, res, next) => {
   const { id } = req.params
   const { class_name, type, date, time, duration,
     intenstity_level, location, attenddes, max_size} = req.body
     Class.getById(id)
     .then(addClass => {
         if(!addClass){
             res.status(404).json({message: "Class does not exist"})
         } else {
             return Class.update(id, req.body)
         }
     })
})
    
module.exports = router