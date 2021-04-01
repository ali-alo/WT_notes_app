const fs = require('fs')

class NotesRepository {
	constructor(){
		this.notesDb = []

		fs.readFile('./data/notes.json', (err, data) => {
			if (!err) {
				this.notesDb = JSON.parse(data)
			}
		})
	}

	add(note, callback) {
		note.id = this.generateRandomId()
		this.notesDb.push(note)
		
		this.updateFile(callback)
	}

	update(id, updateNote, callback) {
		const index = this.notesDb.findIndex(note => note.id === id)
		this.notesDb[index] = updateNote
		this.updateFile(callback)
	}

	getAllUnarchived() {
		return this.notesDb.filter(note => !note.archived)
	}

	getAllArchived() {
		return this.notesDb.filter(note => note.archived)
	}

	getById(id) {
		return this.notesDb.find(note => note.id === id)
	}

	delete(id, callback) {
		const index = this.notesDb.findIndex(note => note.id === id)

		// Delete from notesDB array
		this.notesDb.splice(index, 1)

		// Update notes.json file
		this.updateFile(callback)
	}

	archive(id, callback) {
		const index = this.notesDb.findIndex(note => note.id === id)

		this.notesDb[index].archived = true

		this.updateFile(callback)

	}

	generateRandomId() {
		return Math.floor(Math.random() * 99999999999) + 1
	}

	updateFile(callback){
		fs.writeFile('./data/notes.json', JSON.stringify(this.notesDb), callback)
	}
}

module.exports.NotesRepository = NotesRepository