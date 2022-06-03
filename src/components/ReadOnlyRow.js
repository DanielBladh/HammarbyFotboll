import React from 'react'

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{contact.datum}</td>
            <td>{contact.tid}</td>
            <td>{contact.lag}</td>
            <td>{contact.liga}</td>
            <td>{contact.arena}</td>
            <td>{contact.resultat}</td>
            <td>
                <button type="button" onClick={(event) => handleEditClick(event, contact)}
                >
                    Ändra
                </button>
                <button type="button" onClick={() => handleDeleteClick(contact.id)} className="deleteButton">Delete</button>
            </td>
        </tr>
    );
};

export default ReadOnlyRow;