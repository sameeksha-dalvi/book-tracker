const myTracker = [];

function Book(id, title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return this.title + ", " + this.author + ", " + this.pages + " pages, " + this.read;
}

//const book1 = new Book('Alice in Wonderland ', 'Lewis Carroll', '250', 'not read yet');

//console.log(book1.info());

function addBookToTracker(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages, read);
    myTracker.push(book);
    //console.log(myTracker);
}

addBookToTracker('Alice in Wonderland', 'Lewis Carroll', '250', 'not yet read');
addBookToTracker('The Alchemist', 'Paulo Coelho', '210', 'not yet read');
addBookToTracker('Dune', 'Frank Herbert', '412', 'not yet read');


function showBookData() {

    const arrLength = myTracker.length;
    const bookTitle = document.querySelector("#title1");
    const bookAuthor = document.querySelector("#author1");
    const bookPages = document.querySelector("#no_of_pages_1");
    const readStatus = document.querySelector("#read_status_1");
    bookTitle.textContent = myTracker[0].title;
    bookAuthor.textContent = myTracker[0].author;
    bookPages.textContent = myTracker[0].pages;
    readStatus.textContent = myTracker[0].read;
    //console.log(bookTitle.textContent);
    // for (let i = 0; i < arrLength; i++) {
    //     console.log("book" + i + " " + myTracker[i].title);
    // }
}

showBookData();