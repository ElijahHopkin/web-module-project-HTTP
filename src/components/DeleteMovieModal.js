import React from 'react';
import {useHistory, useParams} from 'react-router-dom'

const DeleteMovieModal = (props) => {

    const {deleteMovie} = props
    const {push} = useHistory()
    const {id} = useParams()

    const handleDelete = () => {
        deleteMovie(id)
        push('/movies')
    }

    const handleCancel = () => {
        push('/movies')
    }
    return (<div id="deleteEmployeeModal">
        <div className="modal-dialog">
            <div className="modal-content">
                <form onSubmit = {handleDelete}>
                    <div className="modal-header">						
                        <h4 className="modal-title">Delete Employee</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div className="modal-body">					
                        <p>Are you sure you want to delete these Records?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                    </div>
                    <div className="modal-footer">
                        <input onClick = {handleCancel} type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                        <input  type="submit" className="btn btn-danger" value="Delete"/>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default DeleteMovieModal;