
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    const navigate=useNavigate()
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, update] = useState({
    description:"", emergency: false
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const sendToApi={"userId": honeyUserObject.id,
        "description": ticket.description,
        "emergency": ticket.emergency,
        "dateCompleted":""}


        // TODO: Perform the fetch() to POST the object to the API
        const sendData = async () => {
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(sendToApi)
            }
            const response = await fetch (`http://localhost:8088/serviceTickets`, options)
            await response.json()
            navigate("/tickets")
          }
          sendData()
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={(event)=>{const copyOfTicket ={...ticket}
                        copyOfTicket.description =event.target.value
                        update(copyOfTicket)}} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={(event)=>{const copyOfTicket ={...ticket}
                        copyOfTicket.emergency =event.target.checked
                        update(copyOfTicket)}} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleSaveButtonClick}>
                Submit Ticket
            </button>
        </form>
    )
}