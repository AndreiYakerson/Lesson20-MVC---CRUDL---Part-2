'use strict'

let gCurrBookId

function init() {
    readQueryParams()
    renderQueryParams()
    renderStats()
    renderBooks(getPagedBooks(getFilteredBooks()))
}

function renderBooks(array) {

    var elTbody = document.querySelector('table')
    var strHTML = `<tr>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
        </tr> <tbody>`

    array.forEach(book => {
        strHTML += `<tr>
             <td>${book.title}</td>
             <td>${book.price}</td>
             <td>${'★'.repeat(+book.rating)}</td>
             <td>
                 <button onclick="onDetailBook('${book.id}')">Detail</button>
                 <button onclick="onShowUpdateModal('${book.id}')">Update</button>
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

    checkPageIdx()
    renderPageNum()
    renderBooks(getPagedBooks(getFilteredBooks()))
    renderStats()
}

function onShowUpdateModal(bookId) {
    const book = gBooks.find(book => book.id === bookId)

    const elInputRating = document.querySelector('.input.update-rating')
    const elInputTitle = document.querySelector('.input.update-title')
    const elInputPrice = document.querySelector('.input.update-price')

    const elModal = document.querySelector('.update-modal')
    elModal.showModal()
    

    elInputTitle.value = book.title
    elInputPrice.value = +book.price
    elInputRating.value = book.rating

    gCurrBookId = bookId
}

function onUpdateNewBook() {

    const elInputTitle = document.querySelector('.input.update-title')
    const elInputPrice = document.querySelector('.input.update-price')
    const elInputRating = document.querySelector('.input.update-rating')


    let title = elInputTitle.value
    let price = +elInputPrice.value
    let rating = +elInputRating.value
    

    if (!title || !price) {
        showMsg('Blank title or price!')
        return
    }
    
    updateBook(gCurrBookId, title, price,rating)
    
    renderBooks(getPagedBooks(getFilteredBooks()))
    renderStats()
    showMsg('The book has updated')

    elInputTitle.value = ''
    elInputPrice.value = ''
    elInputRating.value = ''
}

function onAddBook() {
    const elAddModal = document.querySelector('.add-modal')
    elAddModal.showModal()
}

function onSaveNewBook() {
    const elInputTitle = document.querySelector('.input.add-title')
    const elInputPrice = document.querySelector('.input.add-price')
    const elInputRating = document.querySelector('.input.add-rating')

    let title = elInputTitle.value
    let price = +elInputPrice.value
    let rating = +elInputRating.value

    const newBook = createBook(title, price,rating)


    if (!title || !price) {
        showMsg('Blank title or price!')
        return
    }

    addBook(newBook)
    renderBooks(getPagedBooks(getFilteredBooks()))
    renderStats()
    showMsg('The book has added')

    elInputTitle.value = ''
    elInputPrice.value = ''
    elInputRating.value = ''
}



function onDetailBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.detail-modal')
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

function onSetFilterByTitle(value) {
    setFilterByTitle(value)
    getFilteredBooks()
    renderBooks(getPagedBooks(getFilteredBooks()))
    setQueryParams()
}

function onChangeRating(value) {
    setFilterByRating(value)
    getFilteredBooks()
    renderBooks(getPagedBooks(getFilteredBooks()))
    setQueryParams()
}

function onSetFilterByPrice(value) {
    setFilterByPrice(value)
    getFilteredBooks()
    renderBooks(getPagedBooks(getFilteredBooks()))
    setQueryParams()
}

function onClearFilter() {
    resetFilters()
    resetSortBy()
    renderClearSortBy()
    renderClearFilters()
    renderBooks(getPagedBooks(getFilteredBooks()))
    setQueryParams()
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

function renderClearFilters() {
    const elTitleFilter = document.querySelector('.filter.title')
    const elRatingFilter = document.querySelector('select.rating')
    const elPriceFilter = document.querySelector('.filter.price')

    elTitleFilter.value = ''
    elRatingFilter.value = ''
    elPriceFilter.value = ''
}

function renderClearSortBy() {
    const elSortBY = document.querySelector('.sort-field')
    const elDir = document.querySelector('.des-input')

    elSortBY.value = ''
    elDir.checked = false
}

function onSortBy() {
    const elSortField = document.querySelector('.sort-field')
    const elSortDir = document.querySelector('.des-input')

    const sortField = elSortField.value
    const sortDir = elSortDir.checked

    gQueryOptions.sortBy.sortField = sortField
    gQueryOptions.sortBy.sortDir = sortDir

    if (elSortField.value === '') {
        resetSortBy()
        renderClearSortBy()
    }

    renderBooks(getPagedBooks(getFilteredBooks()))
    setQueryParams()
}

function setQueryParams() {
    const queryParams = new URLSearchParams

    queryParams.set('title', gQueryOptions.filterByTitle)
    queryParams.set('price', gQueryOptions.filterByPrice)
    queryParams.set('minRating', gQueryOptions.filterByRating)
    queryParams.set('sortDir', gQueryOptions.sortBy.sortDir)
    queryParams.set('sortField', gQueryOptions.sortBy.sortField)


    const newUrl =
        window.location.protocol + '//' +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)

    gQueryOptions.filterByTitle = queryParams.get('title') || ''
    gQueryOptions.filterByPrice = queryParams.get('price') || ''
    gQueryOptions.filterByRating = queryParams.get('minRating') || ''
    gQueryOptions.sortBy.sortField = queryParams.get('sortField') || ''

    if (queryParams.get('sortDir') === 'true') {
        gQueryOptions.sortBy.sortDir = true
    } else {
        gQueryOptions.sortBy.sortDir = false
    }

}

function renderQueryParams() {

    const elTitleInput = document.querySelector('.filter.title')
    const elPriceInput = document.querySelector('.filter.price')
    const elRatingInput = document.querySelector('.filter.rating')

    const elSortField = document.querySelector('.sort-field')
    const elSortDir = document.querySelector('.des-input')

    elTitleInput.value = gQueryOptions.filterByTitle || ''
    elPriceInput.value = gQueryOptions.filterByPrice || ''
    elRatingInput.value = gQueryOptions.filterByRating || ''
    elSortField.value = gQueryOptions.sortBy.sortField

    if (gQueryOptions.sortBy.sortDir) elSortDir.checked = true

}

function onNextPageClick() {
    nextPageIdx()
    renderBooks(getPagedBooks(getFilteredBooks()))
    renderPageNum()
}

function onPrevPageClick() {
    PrevPageIdx()
    renderBooks(getPagedBooks(getFilteredBooks()))
    renderPageNum()
}

function renderPageNum() {
    const elPageNum = document.querySelector('.pages-btn-container p span')
    elPageNum.innerHTML = getPageIdx() + 1
}


