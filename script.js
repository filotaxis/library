const inputs = document.querySelector("#inputs");
const bookSpace = document.querySelector(".books-container");
let myLibrary = [];

function Book(name, author, numPag, status) {
    this.name = name;
    this.author = author;
    this.numPag = numPag;
    this.status = status;
    
    this.info = () => {
        return `${this.name} by ${this.author}, ${this.numPag} pages, ${this.status}`
    }
}

function addBookToLibrary(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const title = form.get("title");
    const author = form.get("author");
    const numPag = form.get("num-pag");
    const status = form.get("status");

    const newBook = new Book(title, author, numPag, status);

    myLibrary.push(newBook);
    displayBooks();
}

function createBookCard(book) {
    const card = document.createElement("div");
    const title = document.createElement("h4");
    const author = document.createElement("p");
    const numPag = document.createElement("p");
    const status = document.createElement("p");

    title.textContent = book.name;
    author.textContent = book.author;
    numPag.textContent = `${book.numPag} pages`;
    status.textContent = book.status;

    card.classList.add("card");

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(numPag);
    card.appendChild(status);

    bookSpace.appendChild(card);
}


function displayBooks() {
    bookSpace.innerHTML = "";
    for (book of myLibrary) {
        createBookCard(book);
    }
}

const bryan = new Book("bryan", "bryanham", "321", true);
myLibrary.push(bryan);
displayBooks();
inputs.addEventListener("submit", addBookToLibrary);