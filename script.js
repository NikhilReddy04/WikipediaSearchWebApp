let searchInputElement = document.getElementById("searchInput");

let searchResultElement = document.getElementById("searchResults");

let spinElement = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    let containerDiv = document.createElement('div');
    containerDiv.classList.add("result-item");


    let headingElement = document.createElement('a');
    headingElement.href = link;
    headingElement.textContent = title;
    headingElement.target = "_blank";
    headingElement.classList.add("result-title");
    containerDiv.appendChild(headingElement);

    let titleBreakEl = document.createElement("br");
    containerDiv.appendChild(titleBreakEl);

    let urlElement = document.createElement('a');
    urlElement.textContent = link;
    urlElement.href = link;
    urlElement.classList.add("result-url");
    containerDiv.appendChild(urlElement);

    let linkBreakEl = document.createElement("br");
    containerDiv.appendChild(linkBreakEl);


    let paraElement = document.createElement('p');
    paraElement.textContent = description;
    paraElement.classList.add("link-description");
    containerDiv.appendChild(paraElement);

    searchResultElement.appendChild(containerDiv);
}

function displayResults(searchResults) {
    spinElement.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultElement.textContent = null;
        spinElement.classList.toggle("d-none");
        let searchInput = searchInputElement.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}


searchInputElement.addEventListener('keydown', searchWikipedia);