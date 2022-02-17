import { deleteRequest, getRequests } from "./dataAccess.js"

const convertRequestToListElement = (requestObject) => {
    
    let html = 
    `
    <li>
    Request: ${requestObject.description} 
    Needed completion:${requestObject.neededBy}
    <button class="request_delete" id="request--${requestObject.id}>Delete</button>
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
    }
})