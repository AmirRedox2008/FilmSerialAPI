const db = require('../db')

async function list(req, res) {
  try {
    const favorites = await db.favorite.findMany({
      where: { userId: req.user.id },
      include: { title: { include: { genres: { include: { genre: true } } } } },
      orderBy: { createdAt: 'desc' }
    })

    res.json({ data: favorites.map(f => ({ addedAt: f.createdAt, ...f.title, cast: JSON.parse(f.title.cast) })) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function add(req, res) {
  const titleId = parseInt(req.params.titleId)

  try {
    const title = await db.title.findUnique({ where: { id: titleId } })
    if (!title) {
      return res.status(404).json({ message: 'Title not found' })
    }

    const exists = await db.favorite.findUnique({
      where: { userId_titleId: { userId: req.user.id, titleId } }
    })

    if (exists) {
      return res.status(409).json({ message: 'Already in your list' })
    }

    await db.favorite.create({ data: { userId: req.user.id, titleId } })
    res.status(201).json({ message: 'Added to your list' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function remove(req, res) {
  const titleId = parseInt(req.params.titleId)

  try {
    await db.favorite.delete({
      where: { userId_titleId: { userId: req.user.id, titleId } }
    })
    res.json({ message: 'Removed from your list' })
  } catch (err) {
    res.status(404).json({ message: 'Not in your list' })
  }
}

module.exports = { list, add, remove }
