const router = require('express').Router()
const ctrl = require('../controllers/titleController')
const { authRequired, adminRequired } = require('../middleware/auth')

router.get('/', ctrl.list)
router.get('/:slug', ctrl.getOne)
router.post('/', authRequired, adminRequired, ctrl.create)
router.put('/:id', authRequired, adminRequired, ctrl.update)
router.delete('/:id', authRequired, adminRequired, ctrl.remove)
router.post('/:id/rate', authRequired, ctrl.rate)
router.get('/:id/reviews', ctrl.getReviews)
router.post('/:id/reviews', authRequired, ctrl.addReview)

module.exports = router
