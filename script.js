function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return title + ", " + author + ", " + pages + " pages, " + read;
    }
}

const book1 = new Book('Alice in Wonderland ', 'Lewis Carroll', '250', 'not read yet');

console.log(book1.info());