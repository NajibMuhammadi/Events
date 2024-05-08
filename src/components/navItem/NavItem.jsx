import './navItem.css';
import { Link } from 'react-router-dom'

function NavItem() {
    return (
        <ul className='header__list'>
            <Link to='/' className='header__list-link'>Home</Link>
            <Link to='/events' className='header__list-link'>Events</Link>
            <Link to='/tickets' className='header__list-link'>Orders</Link>
        </ul>
    )
}

export default NavItem
