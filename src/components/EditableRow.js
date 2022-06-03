import React from 'react'

const EditableRow = (editFormData, handleEditFormChange, handleCancelClick) => {
    return (
        <tr>
            <td>
                <input type="text"
                    required="required"
                    name="datum"
                    value={editFormData.datum}
                    onChange={handleEditFormChange}>
                </input>
            </td>
            <td>
                <input type="text"
                    required="required"
                    name="tid"
                    value={editFormData.tid}
                    onChange={handleEditFormChange}>
                </input>
            </td>
            <td>
                <input type="text"
                    required="required"
                    name="lag"
                    value={editFormData.lag}
                    onChange={handleEditFormChange}>
                </input>
            </td>
            <td>
                <input type="text"
                    required="required"
                    name="liga"
                    value={editFormData.liga}
                    onChange={handleEditFormChange}>
                </input>
            </td>
            <td>
                <input type="text"
                    required="required"
                    name="arena"
                    value={editFormData.arena}
                    onChange={handleEditFormChange}>
                </input>
            </td>
            <td>
                <input type="text"
                    required="required"
                    name="resultat"
                    value={editFormData.resultat}
                    onChange={handleEditFormChange}>
                </input>
            </td>
            <td>
                <button type='submit' className='editButton'>Spara</button>
                <button type="button" onClick={handleCancelClick} className="cancelButton">Cancel</button>
            </td>
        </tr>
    )
}

export default EditableRow;