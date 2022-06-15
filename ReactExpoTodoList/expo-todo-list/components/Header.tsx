import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import {useHistory} from "react-router-native";
import { Title,TextInput,Button,Card,Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

        const Logout= ()=>{
          let history=useHistory();
          return(
          <Appbar.Action icon="logout" onPress={async()=>{
            isSignIn=false;
           await AsyncStorage.removeItem('token');
            history.push("/");
                  
          }} />
          );
        }

        const checkUserSignedIn=async()=>{
                try {
                   let value = await AsyncStorage.getItem('token');
                   if (value != null){
                      isSignIn=true;
                   }
                   else {

                  }
                } catch (error) {
                  // Error retrieving data
                }
            }
let isSignIn=false;
const Header=()=>{ 
  {checkUserSignedIn()}
  if(isSignIn){
    return (
        <Appbar.Header>
          <Appbar.Content title="TodoExpo" />
          {Logout()}
        </Appbar.Header>
      );}
    else{
      return(
        <Appbar.Header>
          <Appbar.Content title="TodoExpo" />
        </Appbar.Header>
      );
    }
  }


export default Header

