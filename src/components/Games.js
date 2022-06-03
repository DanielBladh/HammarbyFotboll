import { useEffect, useState, Fragment } from "react";
import data from "../components/game-result.json";
import { nanoid } from 'nanoid';
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import React from "react";

const Games = () => {

  // Creates variable to store data and update the data via setContacts (useState)
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    datum: "",
    tid: "",
    lag: "",
    liga: "",
    arena: "",
    resultat: "",
  });

  const [editFormData, setEditFormData] = useState({
    datum: "",
    tid: "",
    lag: "",
    liga: "",
    arena: "",
    resultat: "",
  })

  const [editContactId, setEditContactId] = useState(null);

  // Function to handle the form and change data.
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
  // Function to Edit the form.
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  // Function to submit to the form.
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      datum: addFormData.datum,
      tid: addFormData.tid,
      lag: addFormData.lag,
      liga: addFormData.liga,
      arena: addFormData.arena,
      resultat: addFormData.resultat,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      datum: editFormData.datum,
      tid: editFormData.tid,
      lag: editFormData.lag,
      liga: editFormData.liga,
      arena: editFormData.arena,
      resultat: editFormData.resultat
    }

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      datum: contact.datum,
      tid: contact.tid,
      lag: contact.lag,
      liga: contact.liga,
      arena: contact.arena,
      resultat: contact.resultat,
    };

    setEditFormData(formValues);
  };

  // Function to cancel.
  const handleCancelClick = () => {
    setEditContactId(null);
  }

  // Function to delete data from the form.
  const handleDeleteClick = (contactId) => {
    const newContacts = [ ...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  }

  return (<div className="table-container">
    <form onSubmit={handleEditFormSubmit}>
      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Tid</th>
            <th>Lag</th>
            <th>Liga</th>
            <th>Arena</th>
            <th>Resultat</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <Fragment>
              {editContactId === contact.id ? (
                <EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
              ) : (
                <ReadOnlyRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </form>

    <h2 className="add-player-title">Lägg till kommande match</h2>
    <form onSubmit={handleAddFormSubmit}>
      <input
        type="text"
        name="datum"
        required="required"
        placeholder="Datum"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="tid"
        required="required"
        placeholder="Tid"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="lag"
        required="required"
        placeholder="Lag"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="liga"
        required="required"
        placeholder="Liga"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="arena"
        required="required"
        placeholder="Arena"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="resultat"
        placeholder="Resultat"
        onChange={handleAddFormChange}
      />
      <button type="submit" className="submitButton">Add</button>
    </form>
  </div>



  );
}

export default Games;