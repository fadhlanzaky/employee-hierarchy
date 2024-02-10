
/* 
all functions regarding authentication
*/

// inserts token to local storage
const login = (data) => {
    if(!data){
        return
    }
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
} 

// removes token from local storage
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
}


// checks for token in local storage
const isLogged = () => {
    return localStorage.getItem('token') === null ? false:true
}


// refresh token, get new token
const GetToken = () => {
    const request = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('refresh_token'),
        }
    }

    fetch("/api/auth/refresh", request)
    .then(res=>res.json())
    .then(data=>{
        localStorage.setItem('token', data.access_token);
    })
    .catch(err=>console.log(err))

    return localStorage.getItem('token')
}


export {login, logout, isLogged, GetToken}