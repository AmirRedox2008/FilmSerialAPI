const jwt = require('jsonwebtoken')
const db = require('../db')

async function authRequired(req, res, next) {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'You need to login first' })
  }

  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET)
    const user = await db.user.findUnique({ where: { id: payload.id } })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    delete user.password
    req.user = user
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

function adminRequired(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'Admin access only' })
  }
}

module.exports = { authRequired, adminRequired }
