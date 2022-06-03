import { Router, Link } from 'react-router-dom';
import hammarbylogo from './../../src/assets/logo-hammarby.png';


const Navbar = () => {

    function navigateTo () {
        window.location.href = "http://localhost:3000/";
    }

    return (
        <>
        <nav className="navbar">
            <div className='nav-links' id='nav-links'>
                <Link to="Games">Matcher/Resultat</Link>
                <Link to="Team">Trupp</Link>
                <Link to="History">Historia</Link>
            </div>
            <div className='nav-logo'>
                <img src={hammarbylogo} alt="logo" onClick={()=>navigateTo()} height="60px" width="60px"></img>
            </div>
            <div className='nav-links-right' id='nav-links-right'>
                <Link to="Contact">Kontakt</Link>
            </div>    
        </nav>
        <div className='nav-border'></div>
        </>
    );
}
 
export default Navbar;