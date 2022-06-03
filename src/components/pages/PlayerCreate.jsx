import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col  } from 'react-bootstrap';
import React from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const PlayerCreate = () => {

    const [loading, setLoading] = useState(false);

    /* All the states being used in the component, Player attributes broken out to states */
    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [age, setAge] = useState();
    const [position, setPosition] = useState();
    const [profilepicture, setProfilePicture] = useState();

    /* Posts a new player object to table "players" */
    const createPlayer = async (player) => {
        setLoading(true);
        await fetch('http://localhost:3001/players', {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(player)
        });
        setLoading(false);
    };

    /* Submit handler for when Ssubmitting a form with a new player object */
    const handleSubmit = async (e) => {
        e.preventDefault();

        await playerCreatedSuccess();
        const player = { firstname, lastname, age, position, profilepicture};
        await createPlayer(player);
        
    }    
    /* Casts the different positions from selected to a number for the foreign key in data.json */
    /* Accepts an event and switches on value (e.target.value) */
    /* Sets the Player Position */
    const handleSelectedPosition = async (e) => {
        switch(e.target.value) {
            case 'Målvakt':
                return setPosition(1);       
            case 'Back':
                return setPosition(2);
            case 'Mittfältare':
                return setPosition(3);
            case 'Anfallare':
                return setPosition(4);
            default:
                return null
        }
    }
    /* Success popup for when you save a player */
    const playerCreatedSuccess = async () => {
        const MySwal = withReactContent(Swal)

        await MySwal.fire({
        title: <strong>Lyckades!</strong>,
        html: <i>Spelare har lagts till!</i>,
        icon: 'success'
        });
    }
    return (
        <>
        <Container>
        <Form onSubmit={handleSubmit} style={{marginTop: 40}}>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Label style={{fontWeight: "bolder", color: "black", fontSize: 18}}>Förnamn</Form.Label>
                    <Form.Control 
                        size="lg"
                        placeholder="Skriv in förnamn..." 
                        onChange={(e) => setFirstName(e.target.value)} /* Sets Player Firstname when changed */
                    />
                </Col>
                <Col xs={12} md={6}>
                    <Form.Label style={{fontWeight: "bolder", color: "black", fontSize: 18}}>Efternamn</Form.Label>
                    <Form.Control 
                        size="lg"
                        placeholder="Skriv in efternamn..." 
                        onChange={(e) => setLastName(e.target.value)} /* Sets Player Lastname when changed */
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Label style={{fontWeight: "bolder", color: "black", fontSize: 18}}>Ålder</Form.Label>
                    <Form.Control 
                        size="lg"
                        placeholder="Skriv in ålder..." 
                        onChange={(e) => setAge(e.target.value)} /* Sets Player Age when changed */
                    />
                </Col>
                <Col xs={12} md={6}>
                    <Form.Label style={{fontWeight: "bolder", color: "black", fontSize: 18}}>Position</Form.Label>
                    <Form.Control 
                            as="select"
                            size="lg"
                            onChange={(e) => handleSelectedPosition(e)} /* Sends event to method which casts string to number */
                                                                        /* and sets the Player Position */
                        >
                        <option value=""></option>
                        <option value="Målvakt">Målvakt</option>
                        <option value="Back">Back</option>
                        <option value="Mittfältare">Mittfältare</option>
                        <option value="Anfallare">Anfallare</option>
                        </Form.Control>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Label style={{fontWeight: "bolder", color: "black", fontSize: 18}}>Profilbild URL</Form.Label>
                    <Form.Control 
                        size="lg"
                        placeholder="Skriv in URL..." 
                        onChange={(e) => setProfilePicture(e.target.value)} /* Sets Player Profilepicture when changed */
                    />
                </Col>
                <Col xs={12} md={6}>
                    
                </Col>
            </Row>
            <Row style={{marginTop: 20}}>
                <Col xs={12} md={4}>
                    <Button variant="primary" type="submit" onClick={async (e) => await handleSubmit(e)}> {/* Sends form to handleSubmit when clicked */}
                        Lägg till spelare
                    </Button>
                </Col>
            </Row>
        </Form>
        </Container>
        </>
    )
}

export default PlayerCreate;
