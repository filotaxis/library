const inputs = document.querySelector("#inputs");
const booksContainer = document.querySelector(".books-container");
let myLibrary = [];

function Book(name, author, numPag, status) {
    this.name = name;
    this.author = author;
    this.numPag = numPag;
    this.status = status;
}

function addBookToLibrary(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const title = form.get("title");
    const author = form.get("author");
    const numPag = form.get("num-pag");
    const statusForm = form.get("status");
    const status = statusForm === "on" ? true : false;

    const newBook = new Book(title, author, numPag, status);
    myLibrary.push(newBook);
    displayBooks();
    inputs.reset();
}

function deleteBookFromLibrary(id) {
    myLibrary.splice(id, 1);
    displayBooks();
}

function togggleBookStatus(book) {
    book.status = !book.status;
    displayBooks();
}
function createCard(book, id) {
    
    const card = document.createElement("div");
    const title = document.createElement("h4");
    const author = document.createElement("p");
    const numPag = document.createElement("p");
    const status = document.createElement("button");
    const buttonSpace = document.createElement("div");
    const deleteBook = document.createElement("button");
    
    title.textContent = book.name.toUpperCase();
    author.textContent = `by ${book.author}`;
    numPag.textContent = `${book.numPag} pages`;
    status.textContent = book.status ? "💚 read" : "💔 not read";
    status.style.backgroundColor = book.status ? "#fca311" : "#e56b6f";
    deleteBook.textContent = "✕";

    buttonSpace.classList.add("close");
    deleteBook.classList.add("closeBtn");
    status.classList.add("readStatus");
    card.classList.add("card");
    card.setAttribute("data-id", id);

    buttonSpace.appendChild(deleteBook);
    card.appendChild(buttonSpace);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(numPag);
    card.appendChild(status);
    booksContainer.appendChild(card);
}

function displayBooks() {
    booksContainer.innerHTML = "";
    if (myLibrary.length === 0) {
        booksContainer.innerHTML = "No hay libros mi pana";        
    }
    for (let i = 0; i < myLibrary.length; i++){
        createCard(myLibrary[i], i);
    }
}

inputs.addEventListener("submit", addBookToLibrary);
booksContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("closeBtn")) {
        const cardID = e.target.parentNode.parentNode.getAttribute("data-id");
        deleteBookFromLibrary(cardID);
    }
    else if (e.target.classList.contains("readStatus")) {
        const cardID = e.target.parentNode.getAttribute("data-id");
        togggleBookStatus(myLibrary[cardID]);
    }
});


const bryan = new Book("bryan sawyer", "bryanham", "321", true);
const eve = new Book("last dance", "eve", "444", true);
const zelda = new Book("twilight princess", "zelda", "222", false);
myLibrary.push(bryan);
myLibrary.push(eve);
myLibrary.push(zelda);
displayBooks();