import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { DisplayAlert } from './alert'


// render sign up page
const SignUpPage = (prop) => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const [passwordMatch, setPasswordMatch] = useState(true);

    // on submit handler
    const Submit = (data) => {
        
        // password confirmation
        if (data.password === data.confirmPassword){
            setPasswordMatch(true);

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

            // post request
            fetch("api/auth/signup", request)
            .then(res=>res.json())
            .then(data=>DisplayAlert(data.message))
            .catch(err=>console.log(err))
            
            reset();
        }else{
            setPasswordMatch(false);
        }
        
    }

    return (
        <div className='row h-75 sign-in align-content-center'>
            <div className='col-12'>
                <h1>
                    Sign Up
                </h1>
            </div>
            <div className='col-lg-5 col-12 mt-1' id='sign-up-container'>
                <form onSubmit={handleSubmit(Submit)}>
                    <div className='row'>
                        <div className='col-lg-12'>
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
                        <div className='col-lg-12'>
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
                        <div className='col-lg-12'>
                            <Form.Group>
                                <Form.Control 
                                    className="shadow-sm" 
                                    type="password" 
                                    name="confirmPassword"
                                    placeholder="Confirm Password" 
                                    aria-label="Confirm Password"
                                    {...register("confirmPassword", {required:true, minLength:8})}/>
                            </Form.Group>
                            {errors.confirmPassword?.type==="required" && <span className="form-alert"><small>Confirm Password is required</small></span>}
                            {errors.confirmPassword?.type==="minLength" && <span className="form-alert"><small>Min characters should be 8</small></span>}
                            {!passwordMatch && <span className="form-alert"><small>Password do not match</small></span>}
                        </div> 
                        <div className="col-lg-12">
                            <Form.Group>
                                <button className="btn shadow-sm">
                                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                                </button>
                            </Form.Group>
                        </div>
                    </div>
                </form>
            </div>
            <div className='col-lg-12 mt-2'>
                Already have account? <Link to="/signin">Sign in</Link>
            </div>
        </div>
    )
}

export default SignUpPage