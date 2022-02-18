import { getPlumbers, getRequests } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { render } from "./main.js"

const convertRequestToListElement = (requestObject) => {
    
    let html = `<li>
    <button class="request_delete" id="request--${requestObject.id}">Delete</button>
    Request: ${requestObject.description} 
    Needed completion: ${requestObject.neededBy}
    ${Plumbers(requestObject)}
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

const Plumbers = (requestObject) => {
   
    const plumbers = getPlumbers()

    let html = `
    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
        ${
            plumbers.map(
                plumber => {
                    return `<option value="${requestObject.id}--${plumber.id}">${plumber.name}</option>`
                }).join("")
        }
    </select>`
}

// mainContainer.addEventListener(
//     "change",
//     (event) => {
//         if (event.target.id === "plumbers") {
//             const [requestId, plumberId] = event.target.value.split("--")

//             /*
//                 This object should have 3 properties
//                    1. requestId
//                    2. plumberId
//                    3. date_created
//             */
//             const completion = { }

//             /*
//                 Invoke the function that performs the POST request
//                 to the `completions` resource for your API. Send the
//                 completion object as a parameter.
//              */

//         }
//     }
// )

    // <select id="selectPlumber">
    // <option value="0">Select a plumber</option>
    // <option value="1">Maude</option>
    // <option value="2">Merle</option>
    // </select>