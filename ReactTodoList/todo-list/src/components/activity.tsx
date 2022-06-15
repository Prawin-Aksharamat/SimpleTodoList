import React, { useState } from "react";
import {activityData} from "../Interface/activityData";
import {Card,CardContent,Grid,Button,TextField} from '@material-ui/core';
import axios from 'axios';

interface activityDataItem {
    activity:activityData
    GetActivities:Function
}


const Activity: React.FC<activityDataItem> = ({activity,GetActivities}) => {

    const [isEditMode,toggleEdit]=useState(false);

    const handleEdit=()=>{
        toggleEdit(!isEditMode);
        ((document.querySelector('#error')!)as HTMLInputElement).innerHTML="";
    }

    const handleDelete=()=>{
 
            axios.delete('https://localhost:5001/activities/'+activity.id,
                {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                }
            )
                .then(function (response) {
                    GetActivities();
                })
                .catch(function (error) {
                    console.log(error.response);
                })
    
        
    }

    const confirmEdit=()=>{
        axios.put('https://localhost:5001/activities/'+activity.id,
            {
                "name": ((document.querySelector('#name')!)as HTMLInputElement).value,
                "when": ((document.querySelector('#when')!)as HTMLInputElement).value
            },
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        )
            .then(function (response) {
                activity.name=((document.querySelector('#name')!)as HTMLInputElement).value;
                activity.when=((document.querySelector('#when')!)as HTMLInputElement).value;
                handleEdit();
                GetActivities();
            })
            .catch(function (error) {
                console.log(error.response);
                ((document.querySelector('#error')!)as HTMLInputElement).innerHTML="Invalid Data"
            })
    }

    const getCardContent=()=>{
        if(isEditMode==true){
            return(
                <Card style={{ minWidth:"70vw", margin:8}}>
                    <CardContent>
                <div>
                <Grid container direction="row" alignItems="center" justify="center">
                <Grid container direction="row" alignItems="center" item xs={3}>
                <h2>ActivityId: {activity.id}</h2>
                </Grid>
                <Grid container direction="row" alignItems="center" item xs={3}>
                <TextField 
                label="Activity Name"
                id="name"
                defaultValue={activity.name}
                variant="outlined"
                />
                </Grid>
                <Grid container direction="row" alignItems="center" item xs={4}>
                <TextField
                label="When"
                id="when"
                defaultValue={activity.when}
                variant="outlined"
                />
                </Grid> 
                <Grid container direction="row" alignItems="center" item xs={1}>
                <Button variant="outlined" color="primary" onClick={(confirmEdit)}>
                    Ok
                </Button>
                </Grid>
                <Grid container direction="row" alignItems="center" item xs={1}>
                <Button variant="outlined" color="primary" onClick={(handleEdit)}>
                    Cancel
                </Button>
                </Grid>
                </Grid>
                </div>
                <Grid container direction="column" alignItems="center">
                <h3 id="error" style={{ color: 'red' }}></h3>
                </Grid>
                </CardContent>
                </Card>
                
            );
        }
        else{
            return(
                
                    <Card style={{ minWidth:"70vw", margin:8}}>
                        <CardContent>
                <div>
                <Grid container direction="row" alignItems="center" justify="center">
                <Grid container direction="row" alignItems="center" item xs={3}>
                <h2>ActivityId: {activity.id}</h2>
                </Grid>
                <Grid container direction="row" alignItems="center" item xs={3}>
                <h2>{activity.name}</h2>
                </Grid>
                <Grid container direction="row" alignItems="center" item xs={4}>
                <h2>{activity.when}</h2>
                </Grid>
                <Grid container direction="row" alignItems="center" item xs={1}>
                <Button variant="outlined" color="primary" onClick={(handleEdit)}>
                    Edit
                </Button>
                </Grid>
                <Grid container direction="row" alignItems="center" item xs={1}>
                <Button variant="outlined" color="primary" onClick={(handleDelete)}>
                    Delete
                </Button>
                </Grid>
            
                </Grid>
                </div>
                <Grid container direction="column" alignItems="center">
                <h3 id="error" style={{ color: 'red' }}></h3>
                </Grid>
                </CardContent>
                </Card>
                
            );
        }
    }

    return(
        <div>
            {
            (activity!=undefined)&&(             
                        getCardContent()
                        )
            }
        </div>
    )
}

export default Activity;