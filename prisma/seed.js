require('dotenv').config({ override: true, path: require('path').join(__dirname, '..', '.env') })
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()
const { genres, users, movies, series, reviews, ratings, favorites } = require('./data')

const postersDir = path.join(__dirname, '..', 'posters')

function posterUrl(slug) {
  try {
    const file = path.join(postersDir, slug + '.json')
    const data = JSON.parse(fs.readFileSync(file, 'utf8'))
    const hit = data.results && data.results.find(r => r.original_url)
    if (hit) return hit.original_url
  } catch (e) {
    console.log('no poster file for ' + slug)
  }
  return 'https://picsum.photos/seed/' + slug + '/400/600'
}

async function main() {
  await db.favorite.deleteMany()
  await db.rating.deleteMany()
  await db.review.deleteMany()
  await db.episode.deleteMany()
  await db.season.deleteMany()
  await db.titleGenre.deleteMany()
  await db.title.deleteMany()
  await db.genre.deleteMany()
  await db.user.deleteMany()

  const genreMap = {}
  for (const g of genres) {
    const created = await db.genre.create({ data: g })
    genreMap[g.slug] = created.id
  }

  const userMap = {}
  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10)
    const created = await db.user.create({
      data: { name: u.name, email: u.email, password: hash, role: u.role }
    })
    userMap[u.email] = created.id
  }

  const all = [...movies, ...series]
  const titleMap = {}
  let i = 0

  for (const t of all) {
    const created = await db.title.create({
      data: {
        type: t.type,
        title: t.title,
        originalTitle: t.originalTitle,
        slug: t.posterSlug,
        description: t.description,
        poster: posterUrl(t.posterSlug),
        year: t.year,
        duration: t.duration || null,
        country: t.country,
        rating: t.rating,
        votes: t.votes,
        featured: !!t.featured,
        cast: JSON.stringify(t.cast),
        searchText: (t.title + ' ' + t.originalTitle).toLowerCase(),
        createdAt: new Date(Date.now() - i * 3 * 24 * 3600 * 1000),
        genres: { create: t.genreSlugs.map(slug => ({ genreId: genreMap[slug] })) }
      }
    })
    titleMap[t.posterSlug] = created.id
    i++
  }

  for (const s of series) {
    for (const se of s.seasons) {
      const createdSeason = await db.season.create({
        data: { titleId: titleMap[s.posterSlug], number: se.number }
      })

      let ep = 1
      for (const name of se.episodes) {
        await db.episode.create({
          data: { seasonId: createdSeason.id, number: ep, name, duration: s.duration }
        })
        ep++
      }
    }
  }

  for (const r of reviews) {
    await db.review.create({
      data: {
        userId: userMap[r.email],
        titleId: titleMap[r.slug],
        body: r.body,
        createdAt: new Date(Date.now() - r.daysAgo * 24 * 3600 * 1000)
      }
    })
  }

  for (const r of ratings) {
    await db.rating.create({
      data: { userId: userMap[r.email], titleId: titleMap[r.slug], score: r.score }
    })
  }

  for (const f of favorites) {
    await db.favorite.create({
      data: {
        userId: userMap[f.email],
        titleId: titleMap[f.slug],
        createdAt: new Date(Date.now() - f.daysAgo * 24 * 3600 * 1000)
      }
    })
  }

  console.log('Seed completed: ' + all.length + ' titles, ' + genres.length + ' genres, ' + users.length + ' users')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
