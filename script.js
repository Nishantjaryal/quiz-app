import { loadData } from "./loading.js"


function fetch_data(link) {
    fetch(link)
    .then((response) => response.json())
    .then((json) => loadData(json))
}


fetch_data("./data.json")

