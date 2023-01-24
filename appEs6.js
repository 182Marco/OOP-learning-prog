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
      target.parentElement.remove();
    }
    this.showAlert(`deleted`, ``);
  }
}

// fn
const subForm = e => {
  e.preventDefault();
  const ui = new UI();
  const t = getNode('#title').value,
    a = getNode('#author').value,
    ib = getNode('#isbn').value;
  if (t === '' || a === '' || ib === '') {
    ui.showAlert(`Each field it's required`, 'error');
    return;
  }
  ui.addBookToList(new Book(t, a, ib));
  ui.clearFields();
};

const deleteB = e => {
  const ui = new UI();
  ui.deleteBook(e);
};

getNode('form').addEventListener('submit', e => subForm(e));
getNode(`#book-list`).addEventListener('click', e => deleteB(e));
