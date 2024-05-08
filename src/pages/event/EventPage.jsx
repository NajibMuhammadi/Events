import './eventPage.css';
import { useParams, Link } from 'react-router-dom';
import FootHeader from '../../components/footHeader/FootHeader';
import { ArrowLeft } from '@phosphor-icons/react';
import { useStore } from '../../js-folder/Store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EventPage({ events }) {
    const notify = () => toast.success("Event added to cart successfully!");
    const { eventId } = useParams();
    const event = events.find(event => event.id === eventId);
    const { addToCart, counts, setCounts } = useStore();
    const monthsForkortnig = {
        "Mars": "Mar",
        "April": "Apr",
        "Juli": "Jul",
        "November": "Nov",
        "December": "Dec"
    };
    const totalPrice = (counts[eventId] || 0) * event.price;
    const handleIncrement = () => {
        setCounts({ ...counts, [eventId]: (counts[eventId] || 0) + 1 });
    };

    const handleDecrement = () => {
        if (counts[eventId] > 0) {
            setCounts({ ...counts, [eventId]: (counts[eventId] || 0) - 1 });
        }
    };
    const handleAddToCart = () => {
        addToCart(event);
        if (counts[eventId] > 0) {
            notify();
        } else {
            toast.error("Please add tickets to the cart first!");
        }
    };
    return (
        <div className='eventPage__container'>
            <div className='eventPage__Container-center'>
                <div className='eventPage__arrow-container'>
                    <Link to='/events' className='eventPage__arrow-link'>
                        <ArrowLeft />
                    </Link>
                    <h1 className='eventPage__title'>Event</h1>
                </div>
                <p className='eventPage__text'>You are about to score <br /> some tickets to</p>
                <h2 className='eventPage__username'>{event.name}</h2>
                <div className='eventPage__date-details'>
                    <p className='eventPage__date'>{event.when.date.split(" ")[0]}</p>
                    <span className='eventPage__mon'>{monthsForkortnig[event.when.date.split(" ")[1]]}</span>
                    <p className='eventPage__text-details'>
                        Kl {event.when.from} {event.when.to}
                    </p>
                </div>
                <h3 className='eventPage__location'>{event.where}</h3>
                <div className='eventPage__price-container'>
                    <p className='eventPage__totalPrice'>{totalPrice} SEK</p>
                    <div className='eventPage__btn-container'>
                        <button className='decrementButton' onClick={handleDecrement}>-</button>
                        <span className='count'>{counts[event.id] || 0} </span>
                        <button className='incrementButton' onClick={handleIncrement}>+</button>
                    </div>
                </div>
                <button className='event__btn' onClick={handleAddToCart}>Add to cart</button>
            </div>
            <div className='foot__header'>
                <FootHeader />
            </div>
        </div>
    )
}

export default EventPage;
