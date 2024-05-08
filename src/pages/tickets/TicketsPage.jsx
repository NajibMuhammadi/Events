import './ticketsPage.css';
import FootHeader from '../../components/footHeader/FootHeader';
import { useStore } from '../../js-folder/Store';
import Barcode from 'react-barcode';

function TicketsPage() {
    const { tickets } = useStore();
    if (tickets.length === 0) {
        return (
            <div className='tickets__not-exist'>
                <p className='tickets__not-title'>You have no tickets</p>
                <div className='foot__header'>
                    <FootHeader />
                </div>
            </div>
        );
    }
    const monthsForkortnig = {
        "Mars": "Mar",
        "April": "Apr",
        "Juli": "Jul",
        "November": "Nov",
        "December": "Dec"
    };
    return (
        <div className='ticket__container'>
            <div className='ticket__container-center'>
                {tickets.map((ticket, index) => (
                    <div className='tickets__info-container' key={`${ticket.ticketID}-${index}`}>
                        <div className='tickets__what-container'>
                            <p className='tickets__what'>What</p>
                            <h1 className='ticket__title'>{ticket.name}</h1>
                        </div>
                        <div className='tickets__location-container'>
                            <p className='tickets__where'>Where</p>
                            <p className='tickets__location'>{ticket.where}</p>
                        </div>
                        <div className='tickets__range-container'>
                            <div className='range__date-container'>
                                <p className='range__date-title range__common-title'>When</p>
                                <p className='tickets__date-date range__common'>{ticket.when.date.split(" ")[0]} {monthsForkortnig[ticket.when.date.split(" ")[1]]}</p>
                            </div>
                            <div className='range__time-container'>
                                <p className='range__time-title range__common-title'>From</p>
                                <p className='tickets__time-time range__common'>{ticket.when.from}</p>
                            </div>

                            <div className='range__time-container'>
                                <p className='range__time-title range__common-title'>To</p>
                                <p className='tickets__time-time range__common'>{ticket.when.to}</p>
                            </div>
                        </div>
                        <div className='tickets__seat-container'>
                            <p className='tickets__seat-title'>Info</p>
                            <p className='tickets__seat'>Section {ticket.section} - seat {ticket.seat}</p>
                        </div>
                        <div className='tickets__barcode-container'>
                            <div className='tickets__barcode'>
                                <Barcode value={ticket.ticketID} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='foot__header'>
                <FootHeader />
            </div>

        </div >
    );
}

export default TicketsPage;
