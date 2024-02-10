import React from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { GetToken } from '../auth';
import { DisplayAlert } from './alert';


// render add form
const AddForm = (prop) => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm()

    const handleForm = () => {
        prop.state(current => !current);
    }

    // on submit handler
    const handleAdd = (data) => {
        const request = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer '+ GetToken(),
            },
            body: JSON.stringify({
                'id': data.employeeId,
                'name': data.employeeName,
                'managerId': data.managerId
            })
        }

        fetch("api/add", request)
        .then(res=>res.json())
        .then(data=>{
            DisplayAlert(data.message);
        })
        .catch(err=>console.log(err))
        
        reset();
    }

    return (
        <div className="row position-relative">
            <div className="col-sm-12 col-12 shadow-sm mt-3 position-absolute z-1" id="add-user-panel">
                <form onSubmit={handleSubmit(handleAdd)}> 
                    <Form.Group>
                        <Form.Control
                        className="mt-2" 
                        type="text" 
                        name="employeeName"
                        placeholder="Employee Name" 
                        aria-label="Employee Name"
                        {...register('employeeName', {required:true})}/>
                    </Form.Group>
                    {errors.employeeName && <span className="form-alert"><small>required</small></span>}

                    <Form.Group>
                        <Form.Control
                        className="mt-2" 
                        type="text" 
                        name="employeeId"
                        placeholder="Employee ID" 
                        aria-label="Employee ID"
                        {...register('employeeId', {required:true})}/>
                    </Form.Group>
                    {errors.employeeId && <span className="form-alert"><small>required</small></span>}

                    <Form.Group>
                        <Form.Control
                        className="mt-2" 
                        type="text" 
                        name="managerId"
                        placeholder="Manager ID" 
                        aria-label="Manager ID"
                        {...register('managerId')}/>
                    </Form.Group>
                    {errors.managerId && <span className="form-alert"><small>required</small></span>}

                    <div className="row mt-1">
                        <div className="col-6">
                            <button className="btn mt-2" title="Cancel" onClick={handleForm}><FontAwesomeIcon icon={faXmark} /></button>
                        </div>
                        <div className="col-6">
                            <Form.Group>
                                <button className="btn mt-2" title="Add"><FontAwesomeIcon icon={faFloppyDisk} /></button>
                            </Form.Group>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddForm