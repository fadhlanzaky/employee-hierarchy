import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { GetToken } from '../auth'
import AddForm from './add-form'
import DelForm from './del-form'
import { DisplayAlert } from './alert'


// render search bar
const SearchBar = (prop) => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const [search, setSearch] = useState(false);
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    // const token = GetToken();


    useEffect(()=>{
        
        if(search){
            setSearch(false);

            const request = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '+ token,
                }
            }

            // send request
            fetch(`api/get/${name}`, request)
            .then(res=>res.json())
            .then(data=>{
                DisplayAlert(data.message);
                prop.employee(data.data); // set employee data
            })
            .catch(err=>console.log(err))
        }
    },[name, prop, reset, search, token])
    

    // on submit handler
    const StartSearch = (data) => {
        setToken(GetToken()); // get new token / refresh token
        setName(data.search); // set name
        setSearch(true);
        setShowAddForm(false); // hide add form
        setShowDelForm(false); // hide delete form
    }

    const [showAddForm, setShowAddForm] = useState(false)

    // show add form
    const HandleAddForm = () => {
        setShowAddForm(current => !current);
        setShowDelForm(false);
    }

    const [showDelForm, setShowDelForm] = useState(false)

    // show delete form
    const HandleDelForm = () => {
        setShowDelForm(current => !current);
        setShowAddForm(false);
    }

    return (
        <div className="search-container row w-100">
                <div className="col-lg-10 col-sm-12">
                    <Form.Group>
                        <Form.Control
                            className="form-control shadow-sm" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search"
                            name="search"
                            {...register('search', {required:true})}
                            />
                    </Form.Group>
                    {errors.search && <span className="form-alert"><small>required</small></span>}
                </div>
                <div className="col-lg-2 col-sm-12">
                    <div className="row position-relative">
                        <div className="col-sm-4 col-4">
                            <Form.Group>
                                <button className="btn shadow-sm" title="search" onClick={handleSubmit(StartSearch)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                            </Form.Group>
                        </div>
                        <div className="col-sm-4 col-4">
                            <button className="btn shadow-sm" idtitle="add employee" onClick={HandleAddForm}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                        <div className="col-sm-4 col-4">
                            <button className="btn shadow-sm" idtitle="delete employee" onClick={HandleDelForm}><FontAwesomeIcon icon={faTrashCan} /></button>
                        </div>
                    </div>
                    {(showAddForm) && <AddForm state={setShowAddForm} alert={prop.alert}/>}
                    {(showDelForm) && <DelForm state={setShowDelForm} alert={prop.alert}/>}
                </div>
        </div>
    )
}

export default SearchBar