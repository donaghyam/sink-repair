import { mainContainer } from "./main.js"


const applicationState = {
    requests: {}
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    //fetch data
    return fetch(`${API}/requests`)
        //parse data as json
        .then(response => response.json())
        //what to do with the data
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

//Function to create and export new array of requests
export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}


export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        //The POST method on any HTTP request means "Hey API!! I want you to create something new!"
        method: "POST",
        //Add headers key with value of an object
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            //Why not document????????
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}


/*
Here are the four main methods used on HTTP requests.


GET	    Please give me this resource.
POST	Please create something new.
PUT	    Please modify an existing resource.
DELETE	Please delete an existing.
*/