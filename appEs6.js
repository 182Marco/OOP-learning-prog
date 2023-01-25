const getNode = str => document.querySelector(str);

// constructors
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(b) {
    getNode(`#book-list`).innerHTML += `<tr>
        <td>${b.title}</td>
        <td>${b.author}</td>
        <td>${b.isbn}</td>
        <td class="delete">X</td>
     </tr>`;
  }

  clearFields() {
    const ar = ['#title', '#author', '#isbn'];
    for (let i = 0; i < ar.length; i++) {
      getNode(ar[i]).value = '';
    }
  }

  showAlert(msg, className) {
    getNode(`section`).innerHTML = `<div class="${className} alert">
        <td>${msg}</td>
     </div>`;
    setTimeout(() => getNode(`.alert`).remove(), 3000);
  }

  deleteBook({ target }) {
    if (target.className == 'delete') {
      Storage.remove(target.previousElementSibling.textContent);
      target.parentElement.remove();
      this.showAlert(`deleted`, ``);
    }
  }
}

class Storage {
  static get(item) {
    return JSON.parse(localStorage.getItem(item));
  }
  static set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  static display() {
    const ui = new UI();
    this.get('books').forEach(b => ui.addBookToList(b));
  }
  static store(book) {
    const books = this.get('books') || [];
    books.push(book);
    this.set('books', books);
  }
  static remove(isbn) {
    let books = this.get('books');
    books = [...books.filter(e => e.isbn != isbn)];
    this.set('books', books);
  }
}

// fn
const subForm = e => {
  e.preventDefault();
  const ui = new UI();
  const title = getNode('#title').value,
    author = getNode('#author').value,
    isbn = getNode('#isbn').value;
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert(`Each field it's required`, 'error');
    return;
  }
  const book = new Book(title, author, isbn);
  ui.addBookToList(book);
  Storage.store(book);
  ui.clearFields();
};

const deleteB = e => {
  const ui = new UI();
  ui.deleteBook(e);
};

getNode('form').addEventListener('submit', e => subForm(e));
getNode(`#book-list`).addEventListener('click', e => deleteB(e));

document.addEventListener(`DOMContentLoaded`, Storage.display())

