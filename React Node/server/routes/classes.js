const { Router } = require("express");
const router = Router()

let classes = [
    'Maths',
    'Spanish',
    'History',
    'Geography',
    'Biology',
    'Art'
]

router.route('/')
    .get((req,res) => res.send(classes))
    .post((req,res) => res.send(classes))

module.exports = router
