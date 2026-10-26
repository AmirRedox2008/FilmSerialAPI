const db = require('../db')

function makeSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function uniqueSlug(text) {
  let slug = makeSlug(text)
  if (!slug) slug = 'title'
  const found = await db.title.findUnique({ where: { slug } })
  if (!found) return slug
  return slug + '-' + Math.floor(Math.random() * 10000)
}

function parseTitle(t) {
  return { ...t, cast: JSON.parse(t.cast) }
}

async function list(req, res) {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 12
  const skip = (page - 1) * limit

  const where = {}

  if (req.query.type) where.type = req.query.type
  if (req.query.featured === 'true') where.featured = true

  if (req.query.genre) {
    where.genres = { some: { genre: { slug: req.query.genre } } }
  }

  if (req.query.q) {
    where.searchText = { contains: String(req.query.q).toLowerCase() }
  }

  let orderBy = { createdAt: 'desc' }
  if (req.query.sort === 'rating') orderBy = { rating: 'desc' }
  if (req.query.sort === 'popular') orderBy = { votes: 'desc' }
  if (req.query.sort === 'year') orderBy = { year: 'desc' }

  try {
    const total = await db.title.count({ where })
    const titles = await db.title.findMany({
      where,
      include: { genres: { include: { genre: true } } },
      orderBy,
      skip,
      take: limit
    })

    res.json({
      data: titles.map(parseTitle),
      total,
      page,
      pages: Math.ceil(total / limit)
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function getOne(req, res) {
  try {
    const title = await db.title.findUnique({
      where: { slug: req.params.slug },
      include: {
        genres: { include: { genre: true } },
        seasons: {
          orderBy: { number: 'asc' },
          include: { episodes: { orderBy: { number: 'asc' } } }
        },
        reviews: {
          include: { user: { select: { id: true, name: true } } },
          orderBy: { createdAt: 'desc' }
        },
        _count: { select: { favorites: true } }
      }
    })

    if (!title) {
      return res.status(404).json({ message: 'Title not found' })
    }

    res.json({ data: parseTitle(title) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function create(req, res) {
  const { type, title, originalTitle, description, poster, year, duration, country, featured, genreIds, cast } = req.body

  if (!type || !title || !originalTitle || !description || !poster || !year) {
    return res.status(400).json({ message: 'Some required fields are missing' })
  }

  if (type !== 'movie' && type !== 'series') {
    return res.status(400).json({ message: 'Type must be movie or series' })
  }

  try {
    const slug = await uniqueSlug(originalTitle)
    const created = await db.title.create({
      data: {
        type,
        title,
        originalTitle,
        slug,
        description,
        poster,
        year: parseInt(year),
        duration: duration ? parseInt(duration) : null,
        country: country || '',
        featured: featured === true,
        cast: JSON.stringify(cast || []),
        searchText: (title + ' ' + originalTitle).toLowerCase(),
        genres: { create: (genreIds || []).map(id => ({ genreId: id })) }
      },
      include: { genres: { include: { genre: true } } }
    })

    res.status(201).json({ data: parseTitle(created) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function update(req, res) {
  try {
    const existing = await db.title.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!existing) {
      return res.status(404).json({ message: 'Title not found' })
    }

    const data = {}
    const fields = ['type', 'title', 'originalTitle', 'description', 'poster', 'country']

    for (const f of fields) {
      if (req.body[f] !== undefined) data[f] = req.body[f]
    }

    if (req.body.year !== undefined) data.year = parseInt(req.body.year)
    if (req.body.duration !== undefined) data.duration = req.body.duration ? parseInt(req.body.duration) : null
    if (req.body.featured !== undefined) data.featured = req.body.featured === true
    if (req.body.cast !== undefined) data.cast = JSON.stringify(req.body.cast)

    if (data.title || data.originalTitle) {
      const t = data.title || existing.title
      const o = data.originalTitle || existing.originalTitle
      data.searchText = (t + ' ' + o).toLowerCase()
    }

    if (req.body.genreIds) {
      data.genres = { deleteMany: {}, create: req.body.genreIds.map(id => ({ genreId: id })) }
    }

    const updated = await db.title.update({
      where: { id: existing.id },
      data,
      include: { genres: { include: { genre: true } } }
    })

    res.json({ data: parseTitle(updated) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function remove(req, res) {
  try {
    const existing = await db.title.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!existing) {
      return res.status(404).json({ message: 'Title not found' })
    }

    await db.title.delete({ where: { id: existing.id } })
    res.json({ message: 'Title deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function rate(req, res) {
  const score = parseInt(req.body.score)

  if (!score || score < 1 || score > 10) {
    return res.status(400).json({ message: 'Score must be between 1 and 10' })
  }

  try {
    const title = await db.title.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!title) {
      return res.status(404).json({ message: 'Title not found' })
    }

    const key = { userId_titleId: { userId: req.user.id, titleId: title.id } }
    const existing = await db.rating.findUnique({ where: key })
    let rating = title.rating
    let votes = title.votes

    if (existing) {
      await db.rating.update({ where: key, data: { score } })
      if (votes > 0) {
        rating = rating + (score - existing.score) / votes
      }
    } else {
      await db.rating.create({ data: { userId: req.user.id, titleId: title.id, score } })
      votes = votes + 1
      rating = (rating * title.votes + score) / votes
    }

    const updated = await db.title.update({
      where: { id: title.id },
      data: { rating: Math.round(rating * 10) / 10, votes }
    })

    res.json({ rating: updated.rating, votes: updated.votes })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function getReviews(req, res) {
  try {
    const reviews = await db.review.findMany({
      where: { titleId: parseInt(req.params.id) },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' }
    })

    res.json({ data: reviews })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function addReview(req, res) {
  const { body } = req.body

  if (!body || body.trim().length < 5) {
    return res.status(400).json({ message: 'Review is too short' })
  }

  try {
    const title = await db.title.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!title) {
      return res.status(404).json({ message: 'Title not found' })
    }

    const exists = await db.review.findUnique({
      where: { userId_titleId: { userId: req.user.id, titleId: title.id } }
    })

    if (exists) {
      return res.status(409).json({ message: 'You already wrote a review for this title' })
    }

    const review = await db.review.create({
      data: { userId: req.user.id, titleId: title.id, body: body.trim() },
      include: { user: { select: { id: true, name: true } } }
    })

    res.status(201).json({ data: review })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

module.exports = { list, getOne, create, update, remove, rate, getReviews, addReview }
