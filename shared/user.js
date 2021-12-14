import React, { useEffect, useState } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View, Image, ImageBackground, TouchableHighlight, TouchableOpacity, Platform } from 'react-native';
import { globalStyles } from '../styles/global';
import * as AppAuth from 'expo-app-auth';

class User {
    constructor(id, email, name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }
    get id() {
        return this.id;
    }
    get email() {
        return this.email;
    }
    get name() {
        return this.name;
    }
    get user() {
        return [this.id, this.email, this.name]
    }
    //need to read/write
    //The DB creates the ids for us, we shouldn't have to set the id ever.
    set id(idValue) {
        this.myID = idValue;
    }
    set email(emailValue) {
        this.myEmail = emailValue;
    }
    set name(nameValue) {
        this.myName = nameValue;
    }
}//function that, given a user email, returns a User consisting of  {id, email, name} from the DB
async function readUserFromDataBase(email) {
    const resp = await fetch(`https://hello-campus.herokuapp.com/usersByEmail/` + email);
    const userData = await resp.json();
    this.id = userData.id,
        this.email = userData.email,
        this.name = userData.name
}


let myId = 1;
let myEmail = "paulsamdick";
let myName3 = "samspade3";
let myName2 = "Paul";
let User1 = new User(myId, myEmail, myName3);
let myid2 = User1.myID + 2;
console.log(User1);
console.log(User1.myID);
console.log(myid2);
let User3 = new User(1, "the", "who");
let user4 = readUserFromDataBase("psd22@students.calvin.edu");

