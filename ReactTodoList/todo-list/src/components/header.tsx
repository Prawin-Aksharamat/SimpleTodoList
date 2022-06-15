import {AppBar,Box,Toolbar,Button,Grid,TextField, colors} from '@material-ui/core';
import React, { Component } from "react";
import {useHistory} from "react-router-dom";



const header=()=>{
    const RenderLogout=()=>{
        let history=useHistory();
        if(localStorage.getItem("token")){
            return <Button color="inherit" onClick={()=>{
                localStorage.removeItem('token');
                history.push("/");
            }}>Logout</Button>
            }
            else return <Button color="inherit" onClick={()=>{
                history.push("/");
            }}>Login</Button>;}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <h1><a href="http://localhost:3000/home" style={{ textDecoration: "none",color: 'white' }}>TodoList</a></h1>
            <Grid container justify="flex-end">
            <Grid item>
                {RenderLogout()}
          </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default header
