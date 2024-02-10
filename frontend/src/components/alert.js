import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// render toast
const CustomAlert = (prop) => {

  return (
    <ToastContainer/>
  )
}

// fire toast notif
const DisplayAlert = (message) => toast(message, {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        theme: "colored",
                                        });

export {CustomAlert, DisplayAlert}