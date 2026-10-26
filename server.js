require('dotenv').config({ override: true })
const express = require('express')
const cors = require('cors')
const path = require('path')

const authRoutes = require('./src/routes/auth')
const titleRoutes = require('./src/routes/titles')
const genreRoutes = require('./src/routes/genres')
const favoriteRoutes = require('./src/routes/favorites')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/titles', titleRoutes)
app.use('/api/genres', genreRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Something went wrong' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Filmland API is running on port ' + PORT)
})
