import React, {useContext, useEffect, useState } from 'react';
import {auth} from "../firebase";
import {database} from "../firebase";
const authContext = React.createContext();


export function useAuth(){
    return useContext(authContext)
}
export function AuthProvider({children}) {

    const [currentUser,setCurrentUser] = useState();
   const [loading,setLoading] = useState(true);

    function signup( email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }

    function login( email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }

    function logout() {
        return auth.signOut()
    }

    async function writeData(userName , role, id,address) {

        await database.ref("owners/" + address).set({
            username:userName
        })
        return database.ref( "users/" + id).set({
            username: userName,
            role: role,
            waddress: address
        })
    }

    function updateRoleInBase(role , id) {
        return database.ref("users/" + id).update({
            role:role,
        })
    }

    async function updateUserInBase(userName, id ,address) {

    await database.ref( "owners/" + address).set({
            username:userName
        }) 
        return database.ref("users/" + id).update({
            username:userName
        })
    }

    async function updateAddressInBase(userName ,caddress ,address ,id) {

        await database.ref("owners/" + caddress).remove()
        if(userName){
        await database.ref("owners/" + address).set({
            username: userName
        }) 
    }
        return database.ref("users/" + id).update({
           waddress:address
        }) 

    }

    async function addressToName(address){
        let name
        await database.ref("owners/" + address).child("username").get().then(snapshot =>{
            if(snapshot.exists()){
            name = snapshot.val()}
        else {
            name = address
        }})
        return name
    }
    function updatemail(email) {
        return currentUser.updateEmail(email)
   }
   function updatePass(pass) {

       return currentUser.updatePassword(pass)
   }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user)
            setLoading(false)
        } )
        return unsubscribe
    },[])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        writeData,
        updatemail,
        updatePass,
        updateRoleInBase,
        updateUserInBase,
        updateAddressInBase,
        addressToName,
    }
    return(<authContext.Provider value = {value}>
        {loading?<span>Loading...</span>:children}
    </authContext.Provider>)
}