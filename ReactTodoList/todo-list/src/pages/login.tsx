import React from 'react';
import { TextField,Grid,Button} from '@material-ui/core';
import Header from "../components/header";
import axios from 'axios';
import {useHistory} from "react-router-dom";


const login=()=>{
    
    interface data {
        token:string
    }

    const GetLoginButton=()=>{
        let history=useHistory();

        return (<Button variant="contained" color= "primary" size="large"
        onClick={async()=>{
            await HandleLogin();
            if(localStorage.getItem('token'))history.push("/home");
 
        }}>Login</Button>);
    }

    
    const HandleLogin=async()=>{
        const data={
            Userid: ((document.querySelector('#UserId')!)as HTMLInputElement).value,
            Password: ((document.querySelector('#Password')!)as HTMLInputElement).value
        }
        await axios.post<data>('https://localhost:5001/tokens',data)
                .then(function (response) {
                    localStorage.setItem("token",response.data.token);
                })
                .catch(function (error) {
                    console.log(error.response);
                    ((document.querySelector('#error')!)as HTMLInputElement).innerHTML="Invalid Userid or Password"
                })

    }
    return(
        
        <div><Header/>
        <Grid container direction="column" alignItems="center" justify="center" style={{
            minHeight: "50vh" }}>             
            <h1>Login</h1>
            <TextField id="UserId" label="Username" variant="outlined"  style={{
            margin: 8}}/>
            <TextField type="password"id="Password" label="Password" variant="outlined" style={{
            margin: 16}}/>
            {GetLoginButton()}
            <h3 id="error" style={{ color: 'red' }}></h3>
        </Grid>
        
        </div>
    )
}

export default login;