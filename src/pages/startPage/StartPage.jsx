import FootHeader from '../../components/footHeader/FootHeader';
import Logo from '../../components/logo/Logo';
import './startPage.css';

function StartPage() {
    return (
        < div className='startPage__conatiner' >
            <div className='startPage__info-center'>
                <Logo />
                <h1 className='startPage__title'>Where It’s @</h1>
                <p className='startPage__subtitle'>Ticketing made easy</p>
            </div>
            <div className='foot__header'>
                <FootHeader />
            </div>
        </div >

    )
}

export default StartPage
