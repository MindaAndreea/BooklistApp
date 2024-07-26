class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Book 1",
        author: "Author 1",
        isbn: "12345",
      },
      {
        title: "Book 2",
        author: "Author 2",
        isbn: "2234588",
      },
    ];

    const books = StoredBooks;

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

  const book = new Book(title, author, isbn);

  UI.addBookToList(book);
  UI.clearFields();
});

document
  .querySelector(".container-books-content")
  .addEventListener("click", (event) => {
    UI.deleteBook(event.target);
  });
