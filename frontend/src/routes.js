import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/main";
import SignUpPage from './components/sign-up';
import SignInPage from "./components/sign-in";
import NotFoundPage from "./components/not-found";


// main routes
const Router = (prop) => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main alert={prop.alert}/>}/>
                <Route path='/signup' element={<SignUpPage alert={prop.alert}/>}/>
                <Route path='/signin' element={<SignInPage alert={prop.alert}/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
