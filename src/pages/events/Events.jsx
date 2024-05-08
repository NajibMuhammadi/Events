import './events.css';
import { MagnifyingGlass } from '@phosphor-icons/react'
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FootHeader from '../../components/footHeader/FootHeader';

function Events({ events, setEvents }) {
    useEffect(() => {
        axios.get('https://santosnr6.github.io/Data/events.json')
            .then(res => {
                setEvents(res.data.events);
            }).catch(error => {
                console.log(error);
            })
    }, []);

    function handleEventsContainer(clickedEvent) {
        const eventsMatch = events.some(event => event.name === clickedEvent.name);
        if (eventsMatch) {
            console.log("Clicked event:", clickedEvent);
        }
    }
    const monthsForkortnig = {
        "Mars": "Mar",
        "April": "Apr",
        "Juli": "Jul",
        "November": "Nov",
        "December": "Dec"
    };
    return (
        <div className='events__container'>
            <div className='events__container-center'>
                <h1 className='events__title'>Events</h1>
                <form className='events__form'>
                    <input type="text" className='events__input' placeholder="" />
                    <div className='search-icon'>
                        <MagnifyingGlass />
                    </div>
                </form>
                <div className='events__list-container'>
                    {events.map((event, index) => (
                        <div className='events__item' key={index}>
                            <div className='events__date-container'>
                                <p className='events__info-date'>{event.when.date.split(" ")[0]}</p>
                                <span className='events__info-mon'>
                                    {monthsForkortnig[event.when.date.split(" ")[1]]}
                                </span>
                            </div>
                            <Link to={`/event/${event.id}`} className='events__info-link'>
                                <div
                                    onClick={() => handleEventsContainer(event)}
                                    className='events__info'>
                                    <h2 className='events__info-title'>{event.name}</h2>
                                    <p className='events__info-location'>{event.where}</p>
                                    <div className='event__details'>
                                        <p className='events__info-time'>{event.when.from} - {event.when.to}</p>
                                        <span className='events__info-price'>{event.price} SEK</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    <Link to='/orders'>
                        <button
                            className='events__btn'>Till Varukorgen</button>
                    </Link>
                </div>
            </div>
            <div className='foot__header'>
                <FootHeader />
            </div>
        </div>
    )
}

export default Events
