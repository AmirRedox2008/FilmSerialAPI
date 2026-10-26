const router = require('express').Router()
const ctrl = require('../controllers/genreController')
const { authRequired, adminRequired } = require('../middleware/auth')

router.get('/', ctrl.list)
router.post('/', authRequired, adminRequired, ctrl.create)

module.exports = router
