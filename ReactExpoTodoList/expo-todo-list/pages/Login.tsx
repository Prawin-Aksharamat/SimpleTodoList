import * as React from 'react';
import { View,StyleSheet,Text} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title,TextInput,Button } from 'react-native-paper';
import Header from '../components/Header';
import {useHistory} from "react-router-native";

let ipv4="http://192.168.1.34:5000"

export default function Login(){
    interface data {
        token:string
    }

    const GetLoginButton=()=>{
        let history=useHistory();

        return (<Button mode="contained"
        onPress={async()=>{
            await HandleLogin();
            history.push("/home");
 
        }}>Login</Button>);
    }

    const HandleLogin=async()=>{
    
        
        const data={
            Userid: Userid,
            Password: Password
        }

        let storeData = async (i:any) => {         
              await AsyncStorage.setItem("token",i);}

        await axios.post<data>(ipv4+'/tokens',data)
                .then(function (response) {
                    storeData(response.data.token);
                    console.log(response.data.token);
                })
                .catch(function (error) {
                    console.log(error);
                    setError("Invalid Userid or Password")
                })

    }

    const styles=StyleSheet.create({
        container:{
            flex:1,
            flexDirection:'column',
            }
    })

    const [Userid, setUserid] = React.useState('');
    const [Password, setPassword] = React.useState('');
    const [Error, setError] = React.useState('');

    return(
        <View style={styles.container}>
            <Header/>
            <View style={styles.container}>
            <TextInput
            label="UserId"
            type="outlined"
            value={Userid}
            style={{
                margin: 8,

            }}
            onChangeText={(Userid:string) => setUserid(Userid)}
            />
            
            <TextInput
            label="Password"
            type="flat"
            value={Password}
            style={{
                margin: 8,

            }}
            onChangeText={(Password:string) => setPassword(Password)}
            />

            {GetLoginButton()}
            <Text>{Error}</Text>
            </View>
        
        </View>
    )

}