class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// LOCAL STORAGE

class Store {
  static getBooks() {
    let books;

    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn == isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector(".container-books-content");
    const content = document.createElement("div");
    content.classList.add("content-row");

    content.innerHTML = `
    <p>${book.title}</p>
    <p>${book.author}</p>
    <p>${book.isbn}</p>
    <a href="#" class="delete-button"><i class="fa-regular fa-trash-can"></i></a>`;

    list.appendChild(content);
  }

  static deleteBook(elem) {
    if (elem.classList.contains("delete-button")) {
      elem.parentElement.remove();
    }
  }

  static showAlerts(message, className) {
    const div = document.createElement("div");
    const container = document.querySelector(".container");
    const form = document.querySelector(".book-form");

    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector(".alert").remove(), 1500);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

document.addEventListener("DOMContentLoaded", UI.displayBooks);

document.querySelector(".book-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  if (title === "" || author === "" || isbn === "") {
    UI.showAlerts("Please fill in the fields!", "danger");
  } else {
    const book = new Book(title, author, isbn);

    UI.showAlerts("You added the book!", "success");
    UI.addBookToList(book);

    Store.addBooks(book);

    UI.clearFields();
  }
});

document
  .querySelector(".container-books-content")
  .addEventListener("click", (event) => {
    if (event.target.parentElement.classList.contains("delete-button")) {
      UI.deleteBook(event.target.parentElement);

      const isbn =
        event.target.parentElement.previousElementSibling.textContent;
      Store.removeBook(isbn);

      UI.showAlerts("You removed the book!", "removed");
    }
  });
