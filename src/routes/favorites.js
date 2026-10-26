const router = require('express').Router()
const ctrl = require('../controllers/favoriteController')
const { authRequired } = require('../middleware/auth')

router.get('/', authRequired, ctrl.list)
router.post('/:titleId', authRequired, ctrl.add)
router.delete('/:titleId', authRequired, ctrl.remove)

module.exports = router
