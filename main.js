let bookForm = document.getElementById("book-form")
let tbody = document.getElementById("book-list")
let books = JSON.parse(localStorage.getItem("bookInfo"))

if (books != null) {
    books.forEach(function (faizan) {

        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${faizan.title}</td>
        <td>${faizan.author}</td>
        <td>${faizan.isbn}</td>
        <td><a href="#"class ="btn btn-danger delete">X</a></td>`
        tbody.appendChild(tr)

    })
}



function showAlert() {
    let div = document.createElement("div")
    
    div.className = "alert alert-danger"
    div.appendChild(document.createTextNode("Aee Elvish Bhaiiii"))
    
    let container = document.querySelector(".container")
    container.insertBefore(div, bookForm)
    setTimeout(function(){
        document.querySelector(".alert").remove()
    },4000)

}







function deleteFromTable() {
    let deleteBtn = document.getElementsByClassName("delete")
    Array.from(deleteBtn).forEach(function (item) {
        item.addEventListener("click", function (e) {
            tbody.removeChild(e.target.parentElement.parentElement)
        })
    })
}

deleteFromTable()





function deleteFunctionality() {
    let deleteBtn = document.getElementsByClassName("delete")

    let ArrayDeleteBtn = Array.from(deleteBtn)
    ArrayDeleteBtn.forEach(btn => {
        btn.addEventListener("click", e => {
            let isbn = e.target.parentElement.previousElementSibling.innerText
            let books = JSON.parse(localStorage.getItem("bookInfo"))

            let findIdx;
            books.forEach(function (book, idx) {
                if (book.isbn == isbn) {
                    findIdx = idx
                }

            })
            let newBookArray = books.splice(findIdx, 1)
            localStorage.setItem("bookInfo", JSON.stringify(books))
            window.location.reload()
        })

    })
}
deleteFunctionality()


bookForm.addEventListener("submit", e => {
    e.preventDefault()
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let isbn = document.getElementById("isbn").value



    if (title.length == 0 || author.length == 0 || isbn.length == 0) {
        showAlert()
        // alert("Form fill krde vimrro")
        document.getElementById("title").focus()
        return;
    }

    let tr = document.createElement("tr")
    tr.innerHTML = `
     <td>${title}</td>
     <td>${author}</td>
     <td>${isbn}</td>
     <td><a href="#"class ="btn btn-danger delete">X</a></td>`
    tbody.appendChild(tr)
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("isbn").value = ""
    let newSaveArr = []
    const saveObj = { title, author, isbn }
    console.log(saveObj)
    if (localStorage.getItem("bookInfo") != null) {
        let previousValue = JSON.parse(localStorage.getItem("bookInfo"))
        previousValue.push(saveObj)
        localStorage.setItem("bookInfo", JSON.stringify(previousValue))
    } else {
        newSaveArr.push(saveObj)
        localStorage.setItem("bookInfo", JSON.stringify(newSaveArr))
    }

})
