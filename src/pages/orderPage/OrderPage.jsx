import FootHeader from '../../components/footHeader/FootHeader';
import './orderPage.css';
import { useStore } from '../../js-folder/Store';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function OrderPage() {
    const { cart, removeFromCart, increaseQuantity, addTickets, clearCart } = useStore();

    if (cart.length === 0) {
        return (
            <div className='order__empty-container'>
                <p className='order__empty-title'>Your cart is empty</p>
                <div className='foot__header'>
                    <FootHeader />
                </div>
            </div>
        );
    }
    const handleSendOrder = () => {
        cart.forEach(cartEvent => addTickets(cartEvent));
        clearCart();
        toast.success('Order sent successfully!');
    };
    const totalPrice = cart.reduce((total, cartEvent) => total + cartEvent.quantity * cartEvent.price, 0);
    return (
        <div className='order__container'>
            <div className='order__container-center'>
                <h1 className='order__title'> Cart</h1>
                {cart.map((cartEvent) => (
                    <div key={cartEvent.id} className='order__event'>
                        <div className='order__details '>
                            <h2 className='order__details-title'>{cartEvent.name}</h2>
                            <p className='order__details-text '>{cartEvent.when.date} kl {cartEvent.when.from} {cartEvent.when.to}</p>
                        </div>
                        <div className='order__btn-container'>
                            <button onClick={() => removeFromCart(cartEvent)} className='decrementbtn'>-</button>
                            <span className='order__count'>{cartEvent.quantity}</span>
                            <button onClick={() => increaseQuantity(cartEvent)} className='incrementbtn'>+</button>
                        </div>

                    </div>
                ))}
                <div className='order__total-container'>
                    <p className='order__total-text'>Totalt värde på order</p>
                    <p className='order__total-price'>{totalPrice} SEK</p>
                </div>
                <Link to='/tickets'>
                    <button onClick={handleSendOrder} className='order__btn'>Skicka order</button>
                </Link>
            </div>

            <div className='foot__header'>
                <FootHeader />
            </div>
        </div>

    );

}

export default OrderPage;
