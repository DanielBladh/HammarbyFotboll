import { Link } from 'react-router-dom'

const Home = () => {

    return (
          <div className="main-container">
                <div className="main-left">
                    <h1>Välkommen till Hammarby Fotboll</h1>
                    <p>
                        Sidan är fortfarande under uppbyggnad, men spana gärna in våran trupp sålänge!  <br/>
                        <Link to="/Team" style={{textDecoration: "none", color: "white", cursor: "pointer"}}>Trupp</Link> <br/>
                        <Link to="/Games" style={{textDecoration: "none", color: "white", cursor: "pointer"}}>Matcher</Link> <br/>
                        <Link to="/Contact" style={{textDecoration: "none", color: "white", cursor: "pointer"}}>Kontakt</Link>
                    </p>
                </div>
            </div>
    );

}
export default Home;