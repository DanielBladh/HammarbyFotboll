import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, Card, Row, Col, Container, InputGroup, FormControl, Grid } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

const Team = () => {

  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoadedData, setHasLoadedData] = useState(false);

  /* State for keeping track of the search-word in the input */
  const [search, setSearch] = useState(null);
  /* Duplicate array for searching players - default is all the players being fetched */
  const [searchResult, setSearchResult] = useState([]);

  /* Gets all the records from table Players */
  const getPlayersList = async () => {
      setLoading(true);
      await fetch('http://localhost:3001/players')
        .then((res) => res.json())
        .then(async (result) => {
          /* Gets the Position table and matches the Position.Id with the Player.Position Foreign Key */
          /* Sets the Player.Position to the correct name the Foreign Key is pointing to in Position table (position.name) */
          let positionRes = await (await fetch('http://localhost:3001/position')).json();
          result.map(async (player) => {
            let position = positionRes.find((x) => x.id === player.position)
            player.position = position.name;
          });
          /* Sets both the Players-State and the SearchResult-State to all the fetched players */
            setPlayers(result);
            setSearchResult(result);
        });
      setLoading(false);
  };

  /* Search for players Firstname/Lastname/Position and put them in SearchResult which is being rendered */
  const searchForUserInput = async () => {
    let arr = [];

    if (search !== null || search.length !== 0 || search !== undefined) {
      players.forEach((player) => {
        if (
            player.firstname.toUpperCase().includes(search.toUpperCase()) 
            || player.lastname.toUpperCase().includes(search.toUpperCase())
            || player.position.toUpperCase().includes(search.toUpperCase())
          ) {
            console.log(player); 
            arr.push(player);
            setSearchResult(arr);
            console.log(searchResult);
          }
      })

      if (arr.length === 0) {
        setSearchResult(arr);
      }
    }
  }

  /* Gets all records from table players when the component is first mounted */
  useEffect(() => {
    const fetchDataAsync = async () => {
      if (hasLoadedData === false) {
        await getPlayersList();
        setHasLoadedData(true);
      }
    };
    fetchDataAsync();
  }, [])

    return (
      <>
      <Container>
        <Row>
          <Col xs={12} md={12} style={{marginTop: 10}}>
          <h1 style={{fontWeight: "bolder", fontStyle: "italic", marginTop: 10}}>TRUPPEN</h1>
          </Col>
          <Col xs={12} md={12}>
          <Button 
              onClick={() => navigate('/Player/Create')} /* Navigates to /Player/Create when clicked */
              variant="success" 
              size="lg">
                Lägg till spelare
            </Button>
          </Col>
        </Row>
        <Row style={{marginTop: 20}}>
          <Col xs={12} md={6}>
          <InputGroup>
            <FormControl
              onChange={(e) => setSearch(e.target.value)} /* Sets the Search-Word to event value when changed */
            />
            <Button onClick={() => searchForUserInput()} variant="dark">Sök</Button> {/* Searches for matches when clicked */}
          </InputGroup>
          </Col>
        </Row>
      </Container>
      {
        searchResult !== undefined && <Container className="team-content">
        <div className="cardHolder">
              {
                (searchResult !== undefined || searchResult.length !== 0) /* Checks if searchResult is undefined or not fetched before rendering */
                ? 
                /* Maps all Players to individual cards with it's respective properties when rendered */
                searchResult.map((player, index) => {
                  return (    
                  <Card bg="light" border="dark" key={player.id}>
                    <Card.Img variant="top" src={player.profilepicture}/>
                    <Card.Body>
                      <Card.Title style={{fontWeight: "bolder", fontSize: "20"}}>
                        {player.firstname}
                        <br />  
                        {player.lastname}
                      </Card.Title>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem style={{fontWeight: "bolder", fontSize: "20", alignSelf: "center"}}>
                            Ålder: {player.age}
                        </ListGroupItem>
                        <ListGroupItem style={{fontWeight: "bolder", fontSize: "20", alignSelf: "center"}}>
                            {player.position}
                          </ListGroupItem>
                      </ListGroup>
                      <Button 
                        variant="primary" 
                        onClick={() => navigate('/Player/' + player.id, {state: {id: player.id}})}> {/* Navigates to /Player */}
                                                                                                    {/* Sends player.id as params to other component */}
                            Ändra
                      </Button>
                    </Card.Body>
                  </Card> 
                    )
                }) : <div>Inga spelare hittade...</div>
              } 
          </div>
        </Container>
      }

      </>
     );
}

export default Team;