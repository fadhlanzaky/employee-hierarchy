import React from 'react'
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { GetToken } from '../auth';
import { DisplayAlert } from './alert';


// render delete form
const DelForm = (prop) => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const handleForm = () => {
        prop.state(current => !current);
    }


    // on submit handler
    const handleDel = (data) => {
        const request = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer '+ GetToken(),
            }
        }

        fetch(`api/delete/${data.employeeName}`, request)
        .then(res=>res.json())
        .then(data=>{
            DisplayAlert(data.message);
        })
        .catch(err=>console.log(err))
        
        reset();
    }

    return (
        <div className="row position-relative">
            <div className="col-sm-12 col-12 shadow-sm mt-3 position-absolute z-1" id="add-del-panel">
                <form onSubmit={handleSubmit(handleDel)}> 
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
                    
                    <div className="row mt-1">
                        <div className="col-6">
                            <button className="btn mt-2" title="Cancel" onClick={handleForm}><FontAwesomeIcon icon={faXmark} /></button>
                        </div>
                        <div className="col-6">
                            <Form.Group>
                                <button className="btn mt-2" title="Delete"><FontAwesomeIcon icon={faTrashCan} /></button>
                            </Form.Group>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DelForm