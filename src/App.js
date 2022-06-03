import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './components/Navbar.css'
import './components/Games.css'
import './components/Contact.css'
import './components/Team.css'
import './components/History.css'
import './components/Home.css'
import Navbar from './components/Navbar';
import Team from './components/Team';
import Games from './components/Games';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Contact from './components/Contact';
import Footer from './components/Footer';
import History from './components/History';
import PlayerDetails from './components/pages/PlayerDetails';
import PlayerCreate from './components/pages/PlayerCreate';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/'
        element={<Home />} />
        <Route exact path='/Team'
        element={<Team />} />
        <Route exact path='/Games'
        element={<Games />} />
        <Route exact path='/History'
        element={<History />} />
        <Route exact path='/Contact'
        element={<Contact />} />
        <Route exact path='/Player/:id'
        element={<PlayerDetails />} />
        <Route exact path ='/Player/Create'
        element={<PlayerCreate />} />
        <Route path="*"
        element={<NotFound />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
