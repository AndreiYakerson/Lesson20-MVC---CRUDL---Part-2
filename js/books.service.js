'use strict'

// localStorage.clear()


// if (!_loadBooks()) _saveBooks(getDemoBooks())
// const gBooks = _loadBooks()

const gBooks = getDemoBooks()

let gQueryOptions = {
    filterByTitle: '',
    filterByRating: '',
    filterByPrice: '',
    sortBy: {},
    page: { idx: 0, size: 4 }
}


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
    const rating = getRandomInt(1, 6)

    const imgUrl = 'img/default-book.jpg'

    return { id, title, price, rating, imgUrl }
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
    gQueryOptions.filterByTitle = value
}

function setFilterByRating(value) {
    gQueryOptions.filterByRating = value
}

function setFilterByPrice(value) {
    gQueryOptions.filterByPrice = value
}

function getFilteredBooks() {
    
    let books = gBooks
    console.log(gQueryOptions.sortBy);
    
    if (!gQueryOptions.filterByTitle && !gQueryOptions.filterByRating && !gQueryOptions.filterByPrice && !gQueryOptions.sortBy.sortField) return gBooks
    
    books = books.filter(book =>
        book.title.toLowerCase().includes(gQueryOptions.filterByTitle.toLocaleLowerCase())
    )

    books = books.filter(book =>
        +book.rating >= +gQueryOptions.filterByRating
    )

    books = books.filter(book =>
        book.price.toString().toLowerCase().includes(gQueryOptions.filterByPrice.toLocaleLowerCase())
    )

    if (gQueryOptions.sortBy.sortField === 'price') {
        books.sort((b1,b2) => +b1.price - +b2.price)
    }
    
    if (gQueryOptions.sortBy.sortField === 'rating') {
        books.sort((b1,b2) => +b1.rating - +b2.rating)
    }


    return books
}

function resetFilters() {
    gQueryOptions.filterByTitle = ''
    gQueryOptions.filterByRating = ''
    gQueryOptions.filterByPrice = ''
    gQueryOptions.sortBy = {}
}








