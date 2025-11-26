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



function addBookToTracker(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages, read);
    myTracker.push(book);
    renderBooks();
}


addBookToTracker('Alice in Wonderland', 'Lewis Carroll', '250 pages', 'not yet read');
addBookToTracker('The Alchemist', 'Paulo Coelho', '210 pages', 'not yet read');
addBookToTracker('Dune', 'Frank Herbert', '412 pages', 'not yet read');
addBookToTracker('Atomic Habits', 'James Clear', '320 pages', 'read');
addBookToTracker('To Kill a Mockingbird', 'Harper Lee', '281 pages', 'not yet read');


function renderBooks() {
    const cardContainer = document.querySelector('.cardcontainer');
    cardContainer.innerHTML = "";

    myTracker.forEach(book => {
        cardContainer.appendChild(createBookCard(book));

    });
}




function createBookCard(book) {

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.setAttribute('data-id', book.id);

    const cardDeleteDiv = document.createElement('div');
    cardDeleteDiv.className = 'card-delete';

    const svgNameSpace = "http://www.w3.org/2000/svg";

    const svgDeleteIcon = document.createElementNS(svgNameSpace, "svg");
    svgDeleteIcon.setAttribute('viewBox', '0 0 24 24');
    svgDeleteIcon.setAttribute('fill', 'currentColor');

    const path = document.createElementNS(svgNameSpace, "path");
    path.setAttribute("d", "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z");

    svgDeleteIcon.appendChild(path);
    cardDeleteDiv.appendChild(svgDeleteIcon);


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

    const cardBottom = document.createElement('div');
    cardBottom.className = 'card-bottom';

    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.className = 'toggle-read-btn';
    toggleReadBtn.textContent = 'Mark as Read';

    const bookCoverImg = document.createElement('img');
    bookCoverImg.className = 'book-cover-img';
    bookCoverImg.setAttribute('src', 'images/book_cover.png');
    bookCoverImg.setAttribute('alt', 'Book Cover');

    const bookTitle = document.createElement('p');
    bookTitle.textContent = book.title;

    cardTitle.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;

    cardAuthor.appendChild(bookAuthor);


    const bookPages = document.createElement('p');
    bookPages.textContent = book.pages;

    cardPages.appendChild(bookPages);

    const readStatus = document.createElement('p');
    readStatus.textContent = book.read;

    cardRead.appendChild(readStatus);

    cardImage.appendChild(bookCoverImg);
    cardLeftDiv.appendChild(cardTitle);
    cardLeftDiv.appendChild(cardAuthor);

    cardRightDiv.appendChild(cardPages);
    cardRightDiv.appendChild(cardRead);
    

    cardContent.appendChild(cardLeftDiv);
    cardContent.appendChild(cardRightDiv);

    cardBottom.appendChild(toggleReadBtn);

    cardDiv.appendChild(cardDeleteDiv);
    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardContent);
    cardDiv.appendChild(cardBottom);

    return cardDiv;


}



function resetFormData() {
    document.querySelector('#bookTitle').value = "";
    document.querySelector('#bookAuthor').value = "";
    document.querySelector('#bookPages').value = "";

}


const addBookBtn = document.querySelector('#add-book-btn');
const addBookDialog = document.querySelector('dialog');

addBookBtn.addEventListener('click', function () {
    resetFormData();
    addBookDialog.returnValue = '';
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

    if (title.value == "" || title.value == undefined || author.value == "" || author.value == undefined || pages.value == "" || pages.value == undefined) {
        alert("Please enter all the data to proceed");
        return;
    }

    e.preventDefault();
    addBookDialog.close(title.value + "," + author.value + "," + pages.value + ",not yet read");
});


addBookDialog.addEventListener('close', function () {

    if (addBookDialog.returnValue == "") {
        return;
    }
    const bookData = addBookDialog.returnValue.split(',');

    addBookToTracker(bookData[0], bookData[1], bookData[2], bookData[3]);


});

function removeBookFromTracker(bookId) {
    const bookIndex = myTracker.findIndex(myTracker => myTracker.id === bookId);
    if (bookIndex !== -1) {
        myTracker.splice(bookIndex, 1);
    }
    renderBooks();
}

const cardContainerClick = document.querySelector(".cardcontainer");

cardContainerClick.addEventListener('click', function (event) {
    if (event.target.tagName === "svg" || event.target.tagName === "path") {
        const card = event.target.closest('.card');
        const bookId = card.dataset.id;
        removeBookFromTracker(bookId);
    }

});
