const accessKey = "03B7CKGazYRwWbOzobLGBf4O9HupUW1l_QNK8YBPYMQ"

const formField = document.querySelector("form")
const inputEle = document.getElementById("search-image")
const searchResults = document.querySelector(".SearchResults")
const showMore = document.getElementById("show-more-button")

let inputData = ""
let pageNum = 1;

async function searchImages() {
    inputData = inputEle.value;

    const url = `https://api.unsplash.com/search/photos?page=${pageNum}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if (pageNum === 1)  {
        searchResults.innerHTML = ""
    }

    results.map((result) => {
        const container = document.createElement('div')
        container.classList.add("SearchResult")

        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_desciption

        const imgUrl = document.createElement('a')
        imgUrl.href = result.links.html
        imgUrl.target = "_blank"
        imgUrl.textContent = result.alt_description

        container.appendChild(image)
        container.appendChild(imgUrl)
        searchResults.appendChild(container)
    })

    pageNum++;
    if (pageNum > 1) {
        showMore.style.display = "block"
    }
}

formField.addEventListener("submit", (event) => {
    event.preventDefault()
    pageNum = 1;

    searchImages()
})

showMore.addEventListener("click", (event) => {
    searchImages()
})