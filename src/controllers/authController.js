const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

async function register(req, res) {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' })
  }

  try {
    const exists = await db.user.findUnique({ where: { email } })
    if (exists) {
      return res.status(409).json({ message: 'This email is already registered' })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = await db.user.create({
      data: { name, email, password: hash }
    })

    const token = signToken(user)
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const user = await db.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Wrong email or password' })
    }

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return res.status(401).json({ message: 'Wrong email or password' })
    }

    const token = signToken(user)
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function me(req, res) {
  res.json({ user: req.user })
}

module.exports = { register, login, me }
