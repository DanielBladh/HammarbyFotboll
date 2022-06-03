import { useEffect, useState } from "react";
import React from "react";
import { useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Image  } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from "react-router-dom";

const PlayerDetails = () => {

    const navigate = useNavigate();
    const location = useLocation();

    /* All the states being used in the component, the current Player being viewed and changed/deleted */
    const [player, setPlayer] = useState({});
    const [loading, setLoading] = useState(false);

    /* Updates a record in table Players based on ID and an updated object */
    /* Returns the response.status */
    const updatePlayerById = async () => {
        setLoading(true);
        try {
            let res = await fetch('http://localhost:3001/players/' + player.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(player)
            })
            setLoading(false);
            return res.status;
        }
        catch (err) {
            setLoading(false);
            return err;
        }
    };

    /* Deletes a record in table Players based on id */
    /* Input-parameter ID (number) */
    const deletePlayerById = async (id) => {
        setLoading(true);

        await fetch('http://localhost:3001/players/' + id, {
        method: "DELETE",
        })

        setLoading(false);
    };

    /* Gets a record from table Players which is the one sent with params (location.state.id) */
    const getPlayerById = async () => {
        setLoading(true);
        await fetch('http://localhost:3001/players/' + location.state.id)
        .then((res) => res.json())
        .then (async (playerResult) => {
            /* Gets the Position table and matches the Position.Id with the Player.Position Foreign Key */
            let positionRes = await (await fetch('http://localhost:3001/position')).json();
            let position = positionRes.find((x) => x.id === playerResult.position);
            playerResult.position = position.id;
            setPlayer(playerResult);
        })
            setLoading(false);
        }
    /* Delete handler for when submitting a delete */
    const handleDeleteSubmit = async (id) => {
        await playerDeletedSuccess();
        await deletePlayerById(id);
        navigate('/Team');
    };
    /* Update handler for when submitting a update */
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        await playerUpdateSuccess();
        await updatePlayerById();
    }
    /* Success popup for when you delete a player */
    const playerDeletedSuccess = async () => {
        const MySwal = withReactContent(Swal)

        await MySwal.fire({
        title: <strong>Lyckades!</strong>,
        html: <i>Spelaren har tagits bort!</i>,
        icon: 'success'
        });
    };
    /* Success popup for when you update a player */
    const playerUpdateSuccess = async () => {
        const MySwal = withReactContent(Swal)

        await MySwal.fire({
        title: <strong>Lyckades!</strong>,
        html: <i>Spelaren har ändrats!</i>,
        icon: 'success'
        });
    }

    /* Gets the specific record from table players when the component is first mounted */
    useEffect(() => {
        const getPlayerByIdAsync = async () => {
            await getPlayerById();
        }
        getPlayerByIdAsync();
    }, []);

    return (
    <>
        <Container>
            <Form style={{marginTop: 40}}>
                <Row>
                    <Col xs={12} md={6}>
                        <Col xs={12} md={12}>
                            <Form.Label style={{fontWeight: "bolder", color: "black", fontSize: 18}}>Förnamn</Form.Label>
                            <Form.Control 
                                size="lg"
                                defaultValue={player.firstname}
                                onChange={(e) => setPlayer({...player, firstname: e.target.value})} /* Sets Player Firstname when changed */
                            />
                        </Col>
                        <Col xs={12} md={12}>
                            <Form.Label style={{fontWeight: "bolder", color: "black", fontSize: 18}}>Efternamn</Form.Label>
                            <Form.Control 
                                size="lg"
                                defaultValue={player.lastname}
                                onChange={(e) => setPlayer({...player, lastname: e.target.value})} /* Sets Player Lastname when changed */
                            />
                        </Col>
                        <Col xs={12} md={12}>
                            <Form.Label style={{fontWeight: "bolder", color: "black", fontSize: 18}}>Ålder</Form.Label>
                            <Form.Control 
                                size="lg"
                                defaultValue={player.age}
                                onChange={(e) => setPlayer({...player, age: e.target.value})} /* Sets Player Age when changed */
                            />
                        </Col>
                        <Col xs={12} md={12}>
                            <Form.Label style={{fontWeight: "bolder", color: "black", fontSize: 18}}>Position</Form.Label>
                            <Form.Control 
                                as="select"
                                size="lg"
                                value={player.position}
                                onChange={(e) => setPlayer({...player, position: Number(e.target.value)})}  /* Casts the string to int for Foreign Key */
                                                                                                            /* Sets Player Position when changed */
                            >
                                {/* Select Options */}
                                <option value="1">Målvakt</option> 
                                <option value="2">Back</option>
                                <option value="3">Mittfältare</option>
                                <option value="4">Anfallare</option>
                            </Form.Control>
                        </Col>
                        <Col xs={12} md={12}>
                            <Form.Label style={{fontWeight: "bolder", color: "black", fontSize: 18}}>Profilbild URL</Form.Label>
                            <Form.Control 
                                size="lg"
                                defaultValue={player.profilepicture}
                                onChange={(e) => setPlayer({...player, profilepicture: e.target.value})} /* Sets Player Profilepicture when changed */
                            />
                        </Col>
                    </Col>
                    <Col xs={12} md={6}>
                        <Image style={{marginTop: 20, minHeight: 355}} rounded src={`${player.profilepicture}`}/>
                    </Col>
                </Row>
                <Row style={{marginTop: 20}}>
                    <Col xs={12} md={12}>
                        <Button 
                                variant="success" 
                                type="submit" 
                                size="lg"
                                onClick={(e) => handleUpdateSubmit(e)} /* Handles Update Submit when clicked */
                            >
                            Spara spelare
                        </Button>
                    </Col>
                    <Col xs={12} md={12} style={{marginTop: 20, marginBottom: 20}}>
                        <Button 
                            variant="danger" 
                            size="lg" 
                            onClick={() => handleDeleteSubmit(player.id)} /* Handles Delete Submit when clicked */
                            >
                            Ta bort spelare
                        </Button>

                    </Col>
                </Row>
            </Form>
        </Container>
    </>
    )
}

export default PlayerDetails;