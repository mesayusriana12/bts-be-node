const express = require('express')
const app = express()
const port = 3000

require('dotenv').config({ path: require('find-config')('.env') });

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

var authRouter = require('./src/routes/auth')
var checklistRouter = require('./src/routes/checklist')
var checklistItemRouter = require('./src/routes/checklistItem')

app.use('/', authRouter)
app.use('/', checklistRouter)
app.use('/checklist', checklistItemRouter)

app.get('/', (req, res) => {
  res.send('Hello! Please Sign Up or Sign In to continue.')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app