import React, { useState } from "react";
import {activityData} from "../Interface/activityData";
import { View,StyleSheet, Text} from 'react-native';
import { Title,TextInput,Button,Card,Paragraph } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let ipv4="http://192.168.1.34:5000"

interface activityDataItem {
    activity:activityData
    GetActivities:Function
}


const Activity: React.FC<activityDataItem> = ({activity,GetActivities}) => {

    const [ActivityName, setActivityName] = React.useState(activity.name);
    const [ActivityWhen, setActivityWhen] = React.useState(activity.when);
    const [Error, setError] = React.useState('');
    const [isEditMode,toggleEdit]=useState(false);

    let jwtToken:any=null;

    const handleEdit=()=>{
        toggleEdit(!isEditMode);
        setError("");
    }

    const handleDelete=async()=>{
 
        let getData = async (i:any) => {         
            await  AsyncStorage.getItem(i, (err, result) => {
                jwtToken=result;
              });}
        await getData('token')
            axios.delete(ipv4+'/activities/'+activity.id,
                {
                    headers: { 'Authorization': 'Bearer ' + jwtToken }
                }
            )
                .then(function (response) {
                    GetActivities();
                })
                .catch(function (error) {
                    console.log(error.response);
                })
    
        
    }

    const confirmEdit=async()=>{
        
        let getData = async (i:any) => {         
            await  AsyncStorage.getItem(i, (err, result) => {
                jwtToken=result;
              });}
        
        await getData('token')
        axios.put(ipv4+'/activities/'+activity.id,
            {
                "name": ActivityName,
                "when": ActivityWhen
            },
            { headers: { 'Authorization': 'Bearer ' + jwtToken } }
        )
            .then(function (response) {
                handleEdit();
                GetActivities();
            })
            .catch(function (error) {
                console.log(error.response);
                setError("Invalid Data");
            })
    }

    const getCardContent=()=>{
        if(isEditMode==true){
            return(

                <Card>
                <Card.Content>
                <Title>ActivityId: {activity.id}</Title>
               
               <TextInput
                label="ActivityName"
                type="flat"
                value={ActivityName}
                style={{
                margin: 8,

                }}
                onChangeText={(ActivityName:string) => setActivityName(ActivityName)}
                />

                <TextInput
                label="ActivityWhen"
                type="flat"
                value={ActivityWhen}
                style={{
                margin: 8,

                }}
                onChangeText={(ActivityWhen:string) => setActivityWhen(ActivityWhen)}
                />
              
                <View style={styles.containerRow}>
                <Button mode="contained"  onPress={(confirmEdit)} style={{width: "48%",margin:5}}>
                    Ok
                </Button>
               
               
                <Button mode="contained"  onPress={(handleEdit)} style={{width: "48%",margin:5}}>
                    Cancel
                </Button>
                </View>
                
                
                <Text>{Error}</Text>
                
                </Card.Content>
                </Card>
            );
        }
        else{
            return(
                <Card>
                <Card.Content>
                <Title>ActivityId: {activity.id}</Title>
                <Title>{activity.name}</Title>
                
                <Paragraph>{activity.when}</Paragraph>
                
                <View style={styles.containerRow}>
                <Button mode="contained" style={{width: "48%",margin:5}}
                onPress={handleEdit}>
                    Edit
                </Button>
                
                <Button mode="contained" style={{width: "48%",margin:5}}
                onPress={handleDelete}>
                    Delete
                </Button>
               </View>
                        
                <Text>{Error}</Text>
                </Card.Content>
                </Card>
            );}
        
    }

    return(
        <View>
            {
            (activity!=undefined)&&(             
                        getCardContent()
                        )
            }
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        },
        containerRow:{
            flex:1,
            flexDirection:'row',
            justifyContent: 'center',
    alignItems: 'center'
            }
})

export default Activity;