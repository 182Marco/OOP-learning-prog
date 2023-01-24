const getNode = str => document.querySelector(str)

// constructors
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

function UI() {}

UI.prototype.addBookToList = function (b) {
  getNode('#book-list').innerHTML = `<tr>
      <td>${b.title}</td>
      <td>${b.author}</td>
      <td>${b.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
   </tr>`
}

UI.prototype.clearFields = function () {
  const ar = ['#title', '#author', '#isbn']
  for (let i = 0; i < ar.length; i++) {
    getNode(ar[i]).value = ''
  }
}

// fn
const subForm = e => {
  e.preventDefault()
  const ui = new UI()
  ui.addBookToList(
    new Book(
      getNode('#title').value,
      getNode('#author').value,
      getNode('#isbn').value,
    ),
  )
  ui.clearFields()
}

getNode('form').addEventListener('submit', e => subForm(e))
