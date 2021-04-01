const express = require('express')
const app = express()

const { NotesRepository } = require('./model/notes_repo')

const parser = require('body-parser')
app.use(parser.urlencoded({extended: true}))

app.use('/assets', express.static('./public'))

app.set('view engine', 'pug')


const notesRepo = new NotesRepository()


app.get('/', (req, res) => {
	res.render('index')
})

app.get('/notes/create', (req, res) => {
	res.render('create', {show: req.query.success})
})


app.post('/notes/create', (req, res) => {
	// get the sent data
	const note = {
		title: req.body.title,
		body: req.body.details
	}

	notesRepo.add(note, (err) => {
		if (err) {
			res.redirect('/notes/create?success=0')
		} else {
			res.redirect('/notes/create?success=1')
		}
	})
})

app.get('/notes', (req, res) => {
	const notes = notesRepo.getAllUnarchived()
	res.render('notes', {notes})
})

app.get('/notes/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const note = notesRepo.getById(id)

	res.render('note', {note})
})

app.get('/notes/:id/delete', (req, res) => {
	const id = parseInt(req.params.id)

	notesRepo.delete(id, (err) => {
		if (err) {
			res.redirect('/notes?success=0')
		} else {
			res.redirect('/notes?success=1')
		}
	})
})

app.get('/notes/:id/archive', (req, res) => {
	const id = parseInt(req.params.id)
	notesRepo.archive(id, (err) => {
		if (err) {
			res.redirect('/notes/'+id+'?success=0')
		} else {
			res.redirect('/notes/'+id+'?success=1')
		}
	})
})

app.get('/notes/:id/edit', (req, res) => {
	const id = parseInt(req.params.id)
	const note = notesRepo.getById(id)
	res.render('edit', {note})
})

app.post('/notes/:id/edit', (req, res) => {
	// update the note
	const id = parseInt(req.params.id)
	const note = notesRepo.getById(id)
	note.title = req.body.title
	note.body = req.body.details

	notesRepo.update(id, note, (err) => {
		if (err) {
			res.redirect('/notes/'+id+'?success=0')
		} else {
			res.redirect('/notes/'+id+'?success=1')
		}
	})
})

app.get('/archive', (req, res) => {
	const notes = notesRepo.getAllArchived()

	res.render('archive', {notes})
})

app.get('/apishowcase', (req, res) => {
	res.render('api')
})

app.get('/api/v1/notes', (req, res) => {
	// Getting all unarchived notes
	const notes = notesRepo.getAllUnarchived()

	res.json(notes)
})

app.listen(8080, () => console.log('App is running...'))







