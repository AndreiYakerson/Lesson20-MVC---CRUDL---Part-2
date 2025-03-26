'use strict'

// localStorage.clear()


if (!_loadBooks()) _saveBooks(getDemoBooks())
const gBooks = _loadBooks()


let gQueryOptions = {
    filterByTitle: '',
    filterByRating: '',
    filterByPrice: '',
    sortBy: {},
    page: { idx: 0, size: 10 }
}


function getDemoBooks() {

    return [
        {
            id: getRandomId(),
            title: 'The Advetures of Lori Ipsi',
            price: 120,
            imgUrl: 'img/red-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'World Atlas',
            price: 300,
            imgUrl: 'img/blue-book.gif',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
        {
            id: getRandomId(),
            title: 'Zorba the Greek',
            price: 87,
            imgUrl: 'img/green-book.jpg',
            rating: getRandomInt(1, 6)
        },
    ]
}


function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooks(gBooks)
}

function updateBook(bookId, bookTitle, bookPrice,bookRating) {
    const book = gBooks.find(book => book.id === bookId)
    console.log(book);
    
    book.title = bookTitle
    book.price = bookPrice
    book.rating = bookRating
    _saveBooks(gBooks)
}

function getBookById(bookId) {
    const elBook = gBooks.find(book => book.id === bookId)
    return elBook
}

function addBook(book) {
    gBooks.push(book)
    _saveBooks(gBooks)
}

function createBook(titleValue, priceValue,ratingValue) {
    const id = getRandomId()
    const title = titleValue
    const price = priceValue
    const rating = ratingValue || getRandomInt(1, 6)
    const imgUrl = 'img/default-book.jpg'

    return { id, title, price, rating, imgUrl }
}

function _saveBooks(books) {
    var storageStr = JSON.stringify(books)

    localStorage.setItem('books', storageStr)
}

function _loadBooks() {
    var arr = JSON.parse(localStorage.getItem('books'))
    return arr
}

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
        const dir = gQueryOptions.sortBy.sortDir ? -1 : 1
        books.sort((b1, b2) => (+b1.price - +b2.price) * dir)
    }

    if (gQueryOptions.sortBy.sortField === 'rating') {
        const dir = gQueryOptions.sortBy.sortDir ? -1 : 1
        books.sort((b1, b2) => (+b1.rating - +b2.rating) * dir)
    }

    if (gQueryOptions.sortBy.sortField === 'title') {
        const dir = gQueryOptions.sortBy.sortDir ? -1 : 1
        books.sort((b1, b2) => (b1.title.localeCompare(b2.title)) * dir)
    }

    return books
}

function getPagedBooks(books) {
    if (gQueryOptions.page.idx !== undefined) {
        const startIdx = gQueryOptions.page.idx * gQueryOptions.page.size
        books = books.slice(startIdx, startIdx + gQueryOptions.page.size)
    }

    return books
}


function resetFilters() {
    gQueryOptions.filterByTitle = ''
    gQueryOptions.filterByRating = ''
    gQueryOptions.filterByPrice = ''
}

function resetSortBy() {
    gQueryOptions.sortBy.sortField = ''
    gQueryOptions.sortBy.sortDir = false
}

function nextPageIdx() {
    const pageIdx = gQueryOptions.page.idx
    const pageSize = gQueryOptions.page.size
    const filteredBooks = getFilteredBooks()

    if (pageIdx + 1 === Math.ceil(filteredBooks.length / pageSize)) {
        gQueryOptions.page.idx = 0
    } else {
        gQueryOptions.page.idx++
    }
    console.log(gQueryOptions.page.idx);
}

function PrevPageIdx() {
    const pageIdx = gQueryOptions.page.idx
    const pageSize = gQueryOptions.page.size
    const filteredBooks = getFilteredBooks()

    if (pageIdx === 0) {
        gQueryOptions.page.idx += Math.ceil((filteredBooks.length / pageSize) - 1)
    } else {
        gQueryOptions.page.idx--
    }
    console.log(gQueryOptions.page.idx);
}

function getPageIdx() {
    return gQueryOptions.page.idx
}

function checkPageIdx() {
    const pageIdx = gQueryOptions.page.idx
    const pageSize = gQueryOptions.page.size
    const filteredBooks = getFilteredBooks()

    if (pageIdx + 1 > Math.ceil(filteredBooks.length / pageSize)) {
        gQueryOptions.page.idx--
    }
    console.log(gQueryOptions.page.idx);
}



