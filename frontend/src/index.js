import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from './routes';
import { CustomAlert } from './components/alert';

const App=()=>{

    const alertState = {
        'show': false,
        'message': ''
    };

    return (
        <div className='container vh-100'>
            <Router/>
            <CustomAlert></CustomAlert>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));