const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/create_note', (req, res) => {
    res.render('create_note')
})

app.get('/notes', (req, res) => {
    const notes = ['Some awesome note 1', 'Some awesome note 2', 'Some awesome note 3']
    res.render('all_notes',  { notes: notes })
})

app.listen(8000, err => {
    if (err) throw err
    console.log('App is running ...')
})