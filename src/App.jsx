import React from 'react'
import StartPage from './pages/startPage/StartPage'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Events from './pages/events/Events'
import EventPage from './pages/event/EventPage'
import OrderPage from './pages/orderPage/OrderPage'
import TicketsPage from './pages/tickets/TicketsPage'


function App() {
  const [events, setEvents] = useState([]);
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/events' element={<Events
          events={events}
          setEvents={setEvents}
        />} />
        <Route path='/event/:eventId' element={<EventPage
          events={events}
        />} />
        <Route path='/orders' element={<OrderPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
      </Routes>
    </div>
  )
}

export default App
