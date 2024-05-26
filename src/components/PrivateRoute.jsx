import React from 'react';
import {useAuth} from "./contexts/authContext";
import {database} from "./firebase";
import {Redirect, Route } from "react-router-dom"
import {ManuDash} from "./Dashboards/manuDash";
import {BuyerDash} from "./Dashboards/buyerDash"
import { RetDash } from './Dashboards/retailerDash';
import { useLocalStorage} from "./hooks/useLocalStorage"

export default function PrivateRoute( {...rest}){

    const roleRoute = {
        "manufacturer": <ManuDash/>,
        "retailer": <RetDash/>,
        "exporter": <RetDash/>,
        "importer": <RetDash/>,
        "distributer":<RetDash/>,
        "buyer": <BuyerDash/>,
        "undefined":<div>Loading..</div>
    
    }

    const {currentUser} = useAuth() 
    const [userRole,setUserRole] = useLocalStorage("role", " ")

    async function fetchRole(){
        if(currentUser){
        await database.ref("users/" + currentUser.uid).child("role").get().then(snapshot =>{
            if(snapshot.exists()){
                console.log(snapshot.val())
            setUserRole(snapshot.val())}
    })
}
    }

    React.useEffect(()=>{
        fetchRole()
    },[currentUser,userRole])
    return (
        <Route
            {...rest}
        render = {props => {
            if(window.ethereum){
            return currentUser ?roleRoute[userRole]: <Redirect to = "/login"/>}
        }
        }>    
        </Route>
    )
}