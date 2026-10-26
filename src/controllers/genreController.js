const db = require('../db')

async function list(req, res) {
  try {
    const genres = await db.genre.findMany({
      include: { _count: { select: { titles: true } } },
      orderBy: { name: 'asc' }
    })

    res.json({ data: genres })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function create(req, res) {
  const { name, slug } = req.body

  if (!name || !slug) {
    return res.status(400).json({ message: 'Name and slug are required' })
  }

  try {
    const genre = await db.genre.create({ data: { name, slug } })
    res.status(201).json({ data: genre })
  } catch (err) {
    console.error(err)
    res.status(409).json({ message: 'This genre already exists' })
  }
}

module.exports = { list, create }
