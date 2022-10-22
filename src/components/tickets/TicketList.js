//useState will store the state in a component
//useEffect allows to observe state and run instructions when state changes
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOnly] =useState(false)
    const navigate = useNavigate ()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
      () => {
        if (emergency) {
          const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
          setFiltered(emergencyTickets)
        }

        else {
          setFiltered(tickets)

        }
      }, [emergency]
    )
    useEffect(
        () => {
            console.log("Initial state of tickets", tickets) // View the initial state of tickets
            fetch(`http://localhost:8088/serviceTickets`)
            .then(response => response.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )
    useEffect(
        () => {
          if(honeyUserObject.staff) {
            //for staff
            setFiltered(tickets)
  
          } else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
            //for customers
          }
  
        }, [tickets]
      )
      useEffect(
        () => {
          const openTicketArray = tickets.filter(ticket => {
            return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""

          })
          setFiltered(openTicketArray)

        },
        [openOnly]
      )

  // making a emergency only button for employees, it will setfiltered button to true
  // making a show all button to setfiltered tickets to false
  //:"" means false so it will return an empty string
    return<>
    {
      honeyUserObject.staff
      ? <>
      
      <button onClick={ () => { setEmergency (true) } } >Emergency Only</button> 
      <button onClick={ () => { setEmergency (false) } } >Show All</button> 
      </>
      : <>
       <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
       <button onClick={() => updateOnly(true) }>Open Tickets</button>
       <button onClick={() => updateOnly(false) }>All Tickets</button>
       </>
    }
      
    <h2>List of Tickets</h2>
    <article className="tickets">
      {
        filteredTickets.map(
          (ticket) => {
            return <section key={ticket.id} className="ticket">
              <header>{ticket.description}</header>
              <footer>Emergency: {ticket.emergency ? "❗" : "No" }</footer>
            </section>
          }
        )
      }
    </article>
  </>
}


