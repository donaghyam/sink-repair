import { getPlumbers, getRequests } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { render } from "./main.js"

const convertRequestToListElement = (requestObject) => {
    
    let html = `<li>
    <button class="request_delete" id="request--${requestObject.id}">Delete</button>
    Request: ${requestObject.description} 
    Needed completion: ${requestObject.neededBy}
    </li>
    `
    return html
}


//convert each service request object into HTML representations
export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement).join("")
            }
        </ul>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
        render()
    }
})

const Plumbers = (plumberObject, requestObject) => {
   
    const plumbers = getPlumbers()

    let html = `
    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
        ${
            plumbers.map(
                plumber => {
                    return `<option value="${requestObject.id}--${plumberObject.id}">${plumberObject.name}</option>`
                }).join("")
        }
    </select>`
}

    // <select id="selectPlumber">
    // <option value="0">Select a plumber</option>
    // <option value="1">Maude</option>
    // <option value="2">Merle</option>
    // </select>