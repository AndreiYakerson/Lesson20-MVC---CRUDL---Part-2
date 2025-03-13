'use strict'


function init() {
    renderBooks(gBooks)
    renderStats()
}

function renderBooks(array) {

    var elTbody = document.querySelector('table')
    var strHTML = `<tr>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
        </tr> <tbody>`

    array.forEach(book => {
        strHTML += `<tr>
             <td>${book.title}</td>
             <td>${book.price}</td>
             <td>
                 <button>Read</button>
                 <button onclick="onDetailBook('${book.id}')">Detail</button>
                 <button onclick="onUpdateBook('${book.id}')">Update</button>
                 <button onclick="onRemoveBook('${book.id}')">Delete</button>
                 </td>
             </tr>`
    })
    strHTML += `</tbody>`
    elTbody.innerHTML = strHTML
}

function onRemoveBook(bookId) {
    var isConfirm = confirm('Are you sure?')
    if (isConfirm) {
        removeBook(bookId)
        showMsg('The book has deleted')
    }
    else return

    renderBooks(gBooks)
    renderStats()
}

function onUpdateBook(bookId) {
    updateBook(bookId)
    renderBooks(getFilteredBooks())
    renderStats()
    showMsg('The book has updated')
}

function onAddBook() {
    const newBook = createBook()
    if (newBook === undefined) {
        showMsg('Blank title or price!')
        return
    }


    addBook(newBook)
    renderBooks(gBooks)
    renderStats()
    showMsg('The book has added')

}

function onDetailBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('dialog')
    var elPre = document.querySelector('pre')
    var elImg = document.querySelector('img')

    elPre.innerHTML = `
    Id: ${book.id}
    Title: ${book.title}
    Price: ${book.price}
    Img URL: ${book.imgUrl}
    Raiting: ${book.rating}
    `
    elImg.src = `${book.imgUrl}`
    elModal.showModal()
}

function onSetFilterBy(value) {
    setFilterBy(value)
    getFilteredBooks()
    renderBooks(getFilteredBooks())
}

function onClearFilter() {
    resetFilter()
    renderBooks(getFilteredBooks())
}

function showMsg(msg) {
    const elMsg = document.querySelector('.msg')
    const elSpan = document.querySelector('.msg span')

    elMsg.classList.remove('hidden')
    elSpan.innerHTML = msg

    setTimeout(() => elMsg.classList.add('hidden'), 2000)
}

function renderStats() {
    const elCheap = document.querySelector('footer :first-child span')
    const elAverage = document.querySelector('footer :nth-child(2) span')
    const elExpansive = document.querySelector('footer :last-child span')

    elExpansive.innerHTML = 0
    elAverage.innerHTML = 0
    elCheap.innerHTML = 0

    let cheap = 0
    let average = 0
    let expensive = 0

    gBooks.forEach(book => {
        if (book.price > 200) {
            expensive++
            return
        }
        if (book.price > 80) {
            average++
            return
        }
        if (book.price < 80) {
            cheap++
            return
        }
    })

    elExpansive.innerHTML = expensive
    elAverage.innerHTML = average
    elCheap.innerHTML = cheap
}



