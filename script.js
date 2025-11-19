const myTracker = [];
let singleBookData =[];

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

function addOneBookToTracker(title, author, pages, read) {
    singleBookData = [];
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages, read);
    singleBookData.push(book);
    //console.log(myTracker);
}

addBookToTracker('Alice in Wonderland', 'Lewis Carroll', '250 pages', 'not yet read');
addBookToTracker('The Alchemist', 'Paulo Coelho', '210 pages', 'not yet read');
addBookToTracker('Dune', 'Frank Herbert', '412 pages', 'not yet read');
addBookToTracker('Atomic Habits', 'James Clear', '320 pages', 'read');
addBookToTracker('To Kill a Mockingbird', 'Harper Lee', '281 pages', 'not yet read');


function showBookData(bookArray) {

    const arrLength = bookArray.length;

    for (let i = 0; i < arrLength; i++) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        const cardImage = document.createElement('div');
        cardImage.className = 'card-image';

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        const cardLeftDiv = document.createElement('div');
        cardLeftDiv.className = 'card-left';

        const cardRightDiv = document.createElement('div');
        cardRightDiv.className = 'card-right';

        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';

        const cardAuthor = document.createElement('div');
        cardAuthor.className = 'card-author';

        const cardPages = document.createElement('div');
        cardPages.className = 'card-pages';

        const cardRead = document.createElement('div');
        cardRead.className = 'card-read';

        const bookCoverImg = document.createElement('img');
        bookCoverImg.className = 'book-cover-img';
        bookCoverImg.setAttribute('src', 'images/book_cover.png');
        bookCoverImg.setAttribute('alt', 'Book Cover');

        const bookTitle = document.createElement('p');
        bookTitle.id = 'title' + i;
        bookTitle.textContent = bookArray[i].title;

        cardTitle.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.id = 'author' + i;
        bookAuthor.textContent = bookArray[i].author;

        cardAuthor.appendChild(bookAuthor);


        const bookPages = document.createElement('p');
        bookPages.id = 'no_of_pages_' + i;
        bookPages.textContent = bookArray[i].pages;

        cardPages.appendChild(bookPages);

        const readStatus = document.createElement('p');
        readStatus.id = 'read_status_' + i;
        readStatus.textContent = bookArray[i].read;

        cardRead.appendChild(readStatus);

        cardImage.appendChild(bookCoverImg);
        cardLeftDiv.appendChild(cardTitle);
        cardLeftDiv.appendChild(cardAuthor);

        cardRightDiv.appendChild(cardPages);
        cardRightDiv.appendChild(cardRead);

        cardContent.appendChild(cardLeftDiv);
        cardContent.appendChild(cardRightDiv);

        cardDiv.appendChild(cardImage);
        cardDiv.appendChild(cardContent);

        document.querySelector('.cardcontainer').appendChild(cardDiv);

    }
}

showBookData(myTracker);


const addBookBtn = document.querySelector('#add-book-btn');
const addBookDialog = document.querySelector('dialog');

addBookBtn.addEventListener('click', function () {
    addBookDialog.showModal();
});


const closeBtn = document.querySelector('#close-dialog');

closeBtn.addEventListener('click', function () {
    addBookDialog.close();


});


const submitBtn = document.querySelector('#submitBtn');

submitBtn.addEventListener('click', function (e) {

    const title = document.querySelector('#bookTitle');
    const author = document.querySelector('#bookAuthor');
    const pages = document.querySelector('#bookPages');


    e.preventDefault();
    addBookDialog.close(title.value+","+author.value+","+pages.value+",not yet read");
    console.log("title" + title.value);
});


addBookDialog.addEventListener('close',function(){

    const bookData = addBookDialog.returnValue.split(',');

    addOneBookToTracker(bookData[0],bookData[1],bookData[2],bookData[3]);

    showBookData(singleBookData);

});