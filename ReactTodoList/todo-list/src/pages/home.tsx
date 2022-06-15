import React,{useState} from 'react';
import { TextField,Grid,Button} from '@material-ui/core';
import Header from "../components/header";
import axios from 'axios';
import Activity from "../components/activity";
import {activityData} from "../Interface/activityData";

const Home=()=>{
    let blank:activityData[]=[];
    let [activities,setActivities]=useState(blank);
    let [isGet,setGet]=useState(false);

    const HandleSearch=()=>{
        axios.get<activityData>('https://localhost:5001/activities/'+((document.querySelector('#SearchById')!)as HTMLInputElement).value,
        {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
    )
        .then(function (response) {
            setActivities([response.data]);
            console.log(response.data);
            ((document.querySelector('#error')!)as HTMLInputElement).innerHTML=""

        })
        .catch(function (error) {
            console.log(error.response);
            ((document.querySelector('#error')!)as HTMLInputElement).innerHTML="Invalid Search Data"
        })
    }

    const HandleSubmit=()=>{
        axios.post('https://localhost:5001/activities',
            {
                "name": ((document.querySelector('#Activity')!)as HTMLInputElement).value,
                "when": ((document.querySelector('#When')!)as HTMLInputElement).value
            },
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        )
            .then(function (response) {
                GetActivities();
                ((document.querySelector('#error')!)as HTMLInputElement).innerHTML=""
            })
            .catch(function (error) {
                console.log(error.response);
                ((document.querySelector('#error')!)as HTMLInputElement).innerHTML="Invalid Add Data"
            })
    }
    const GetActivities=()=>{
        axios.get<activityData[]>('https://localhost:5001/activities',
        {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
    )
        .then(function (response) {
            setActivities(response.data);
            console.log(response.data);

        })
        .catch(function (error) {
            console.log(error.response);
        })
        
    }

    {if(!isGet && localStorage.getItem('token')){
        GetActivities();
        setGet(true);
    }}


    if(localStorage.getItem("token")){
    return(
        <div><Header/>
        <Grid container direction="row" alignItems="center" justify="center">             
        <TextField id="Activity" label="Activity" variant="outlined"  style={{
            margin: 16}}/>
        <TextField id="When" label="When" variant="outlined"  style={{
            margin: 16}}/>
        <Button variant="contained" color= "secondary" size="large"
        onClick={()=>{HandleSubmit()
        }}>Add Activity</Button>
        <TextField id="SearchById" label="Search By Id" variant="outlined" color="secondary" style={{
          marginLeft: 100,marginRight: 16}}/>
        <Button variant="contained" color= "primary" size="large"
        onClick={()=>{HandleSearch()
        }}>Search</Button>
        </Grid>
        <Grid container direction="column" alignItems="center">
                <h3 id="error" style={{ color: 'red' }}></h3>
        </Grid>
        <Grid container direction="column" alignItems="center" justify="center">
        {activities.map(activity => (<Activity  activity={activity} GetActivities={GetActivities}/>))}
        </Grid>
        </div>
    )}
    else{
        return(
            <div><Header/>

        <Grid container direction="column" alignItems="center" justify="center" style={{
            minHeight: "50vh" }}>             
            <h1>Please Login First</h1>
        </Grid>
        </div>
        )
    }
}

export default Home;