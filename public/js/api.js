function addElement (note) {
  var newdiv = document.createElement("div");
  newdiv.appendChild(document.createTextNode(note.title));
  document.body.appendChild(newdiv);
}

fetch("/api/v1/notes").then(res => res.json()).then(data => {
	data.forEach(note => addElement(note))
})