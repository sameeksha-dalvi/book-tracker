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

Book.prototype.info = function(){
    return this.title + ", " + this.author + ", " + this.pages + " pages, " + this.read;
}

//const book1 = new Book('Alice in Wonderland ', 'Lewis Carroll', '250', 'not read yet');

//console.log(book1.info());

function addBookToTracker(title,author,pages,read){
    const book = new Book(title,author,pages,read);
    myTracker.push(book);
    console.log(myTracker);
}

//addBookToTracker('abc','sameeksha','100','not yet read');