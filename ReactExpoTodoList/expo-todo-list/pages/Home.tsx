import React,{useState} from 'react';
import Header from "../components/Header";
import { View,StyleSheet, Text,ScrollView,KeyboardAvoidingView} from 'react-native';
import { Title,TextInput,Button} from 'react-native-paper';
import axios from 'axios';
import Activity from "../components/Activity";
import {activityData} from "../Interface/activityData";
import AsyncStorage from '@react-native-async-storage/async-storage';

let ipv4="http://192.168.1.34:5000"

const Home=()=>{

    const [Error, setError] = React.useState('');
    const [Error2, setError2] = React.useState('');
    const [ActivityName, setActivityName] = React.useState('');
    const [ActivityWhen, setActivityWhen] = React.useState('');
    const [SearchID, setSearchID] = React.useState('');
    let jwtToken:any=null;

    let blank:activityData[]=[];
    let [activities,setActivities]=useState(blank);
    let [isGet,setGet]=useState(false);

    const HandleSearch=async()=>{
        let getData = async (i:any) => {         
            await  AsyncStorage.getItem(i, (err, result) => {
                jwtToken=result;
              });}
        
        await getData('token');
        axios.get<activityData>(ipv4+'/activities/'+SearchID,
        {
            headers: { 'Authorization': 'Bearer ' + jwtToken }
        }
    )
        .then(function (response) {
            setActivities([response.data]);
            console.log(response.data);
            setError2("");

        })
        .catch(function (error) {
            console.log(error.response);
            setError2("Invalid Add Data");
        })
    }

    const HandleSubmit=async ()=>{
        let getData = async (i:any) => {         
            await  AsyncStorage.getItem(i, (err, result) => {
                jwtToken=result;
              });}
        
        await getData('token')
        axios.post(ipv4+'/activities',
            {
                "name": ActivityName,
                "when": ActivityWhen
            },
            { headers: { 'Authorization': 'Bearer ' + jwtToken } }
        )
            .then(function (response) {
                GetActivities();
                setError("");
            })
            .catch(function (error) {
                console.log(error.response);
                setError("Invalid Add Data");
            })
    }
    const GetActivities=async()=>{
          
        let getData = async (i:any) => {         
            await  AsyncStorage.getItem(i, (err, result) => {
                jwtToken=result;
              });}
        
        await getData('token')
        axios.get<activityData[]>(ipv4+'/activities',
        {
            headers: { 'Authorization': 'Bearer ' + jwtToken}
        }
    )
        .then(function (response) {
            setActivities(response.data);
            console.log(response.data);

        })
        .catch(function (error) {
            console.log(error);
        })
        
    }

    {if(!isGet && AsyncStorage.getItem("token")!=null){
        GetActivities();
        setGet(true);
    }}


    
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

    if(AsyncStorage.getItem("token")!=null){
    return(
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <ScrollView>

        <Header/>
        <View style={styles.containerRow}>
        <TextInput
                label="ActivityName"
                type="flat"
                value={ActivityName}
                style={{width: "48%",
                margin: 8,

                }}
                onChangeText={(ActivityName:string) => setActivityName(ActivityName)}
                />

                <TextInput
                label="ActivityWhen"
                type="flat"
                value={ActivityWhen}
                style={{width: "48%",
                margin: 8,

                }}
                onChangeText={(ActivityWhen:string) => setActivityWhen(ActivityWhen)}
                />
            </View>
            <View style={styles.containerRow}>
            <Button mode="contained"  onPress={(HandleSubmit) }style={{width: "98%"}}>
                    Add
                </Button>
            </View>
            <Text>{Error}</Text>
            <View style={styles.containerRow}>
            <TextInput
                label="SearchID"
                type="flat"
                value={SearchID}
                style={{width: "58%",
                margin: 8,

                }}
                onChangeText={(SearchID:string) => setSearchID(SearchID)}
                />
            <Button mode="contained"  onPress={(HandleSearch)} style={{width: "36%",height:"80%",fontSize:50,justifyContent: 'center',
        alignItems: 'center'}} labelStyle={{fontSize: 25}}>
                    Search
                </Button>
            <Text>{Error2}</Text>
            </View>

            <View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop:20,
    marginBottom:20
  }}
/>
        {activities.map(activity => (<Activity  key={activity.id} activity={activity} GetActivities={GetActivities}/>))}
        
        </ScrollView>
        </KeyboardAvoidingView>
    )}
    else{
        return(
            <View>
                <Header/>
                Please Login First
            </View>
        )
    }
    
}


export default Home;