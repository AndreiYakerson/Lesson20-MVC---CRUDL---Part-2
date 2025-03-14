'use strict'

// localStorage.clear()


// if (!_loadBooks()) _saveBooks(getDemoBooks())
// const gBooks = _loadBooks()

const gBooks = getDemoBooks()
let gFilterByTitle = ''
let gFilterByRating = ''
let gFilterByPrice = ''


function getDemoBooks() {

    return [
        {
            id: 'bg4J78',
            title: 'The Advetures of Lori Ipsi',
            price: 120,
            imgUrl: 'img/red-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: 'siGN46',
            title: 'World Atlas',
            price: 300,
            imgUrl: 'img/blue-book.gif',
            rating: getRandomInt(1, 6)
        },
        {
            id: 'ap61LU',
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        }
    ]
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    // _saveBooks(gBooks)
}

function updateBook(bookId) {
    const elBook = gBooks.find(book => book.id === bookId)
    elBook.price = +prompt('Set new price')
    // _saveBooks(gBooks)
}

function getBookById(bookId) {
    const elBook = gBooks.find(book => book.id === bookId)
    return elBook
}

function addBook(book) {
    gBooks.push(book)
    // _saveBooks(gBooks)
}

function createBook() {
    const id = getRandomId()
    const title = prompt('Set title')
    if (!title) return
    const price = prompt('Set price')
    if (!price) return

    const imgUrl = 'img/default-book.jpg'

    return { id, title, price, imgUrl }
}

// function _saveBooks(books) {
//     var storageStr = JSON.stringify(books)

//     localStorage.setItem('books', storageStr)
// }

// function _loadBooks() {
//     var arr = JSON.parse(localStorage.getItem('books'))
//     return arr
// }

function setFilterByTitle(value) {
    gFilterByTitle = value
}

function setFilterByRating(value) {
    gFilterByRating = value
}

function setFilterByPrice(value) {
    gFilterByPrice = value
}

function getFilteredBooks() {
    if (!gFilterByTitle && !gFilterByRating && !gFilterByPrice) return gBooks

    let booksByTitle = gBooks.filter(book =>
        book.title.toLowerCase().includes(gFilterByTitle.toLocaleLowerCase())
    )

    let booksByRating = booksByTitle.filter(book =>
        book.rating.toString().toLowerCase().includes(gFilterByRating.toLocaleLowerCase())
    )

    let booksByPrice = booksByRating.filter(book =>
        book.price.toString().toLowerCase().includes(gFilterByPrice.toLocaleLowerCase())
    )

    return booksByPrice
}

function resetFilters() {
    gFilterByTitle = ''
    gFilterByRating = ''
    gFilterByRating = ''
}








