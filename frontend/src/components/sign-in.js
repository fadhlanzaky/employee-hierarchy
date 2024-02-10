import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form'
import { DisplayAlert } from "./alert";
import { login, logout } from "../auth";


// render sign in page
const SignInPage = (prop) => {

    const navigate = useNavigate();

    const {register, handleSubmit, reset, formState: {errors} } = useForm()

    // on submit handler
    const Submit = (data) => {

        const request = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                'username': data.username,
                'password': data.password
            })
        }

        fetch("api/auth/signin", request)
        .then(res=>res.json())
        .then(data=>{
            DisplayAlert(data.message);
            logout(); // logout from previous session
            login(data.data); // create new session
            navigate('/');
        })
        .catch(err=>console.log(err))
        
        reset();
    }

    return (
        <div className='row h-75 sign-in align-content-center'>
            <div className='col-12'>
                <h1>
                    Employee Hierarchy
                </h1>
            </div>
            <div className='col-12 mt-2' id='sign-in-container'>
                <form onSubmit={handleSubmit(Submit)}>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <Form.Group>
                                <Form.Control 
                                    className="shadow-sm" 
                                    type="text" 
                                    name="username"
                                    placeholder="Username" 
                                    aria-label="Username"
                                    {...register("username", {required:true})}/>
                            </Form.Group>
                            {errors.username?.type==="required" && <span className="form-alert"><small>Username is required</small></span>}
                        </div>
                        <div className='col-lg-4'>
                            <Form.Group>
                                <Form.Control 
                                    className="shadow-sm" 
                                    type="password" 
                                    name="password"
                                    placeholder="Password" 
                                    aria-label="Password"
                                    {...register("password", {required:true, minLength:8})}/>
                            </Form.Group>
                            {errors.password?.type==="required" && <span className="form-alert"><small>Password is required</small></span>}
                            {errors.password?.type==="minLength" && <span className="form-alert"><small>Min characters should be 8</small></span>}
                        </div>
                        <div className='col-lg-2'>
                            <Form.Group>
                                <button className="btn shadow-sm">
                                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                                </button>
                            </Form.Group>
                        </div>
                    </div>
                </form>
                <div className='row mt-2'>
                    <div className='col-lg-12'>
                        Don't have an account? <Link to="/signup">Sign up here!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage