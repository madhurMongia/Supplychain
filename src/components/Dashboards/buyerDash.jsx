import React, {useState} from 'react';
import {useAuth} from '../contexts/authContext';
import UpdateProfile from "../login/updateProfile";
import {useHistory, Route} from "react-router-dom"; 
import {TrackProduct} from "./trackProduct";
import "./navbar.scss";
import {About} from "./about";
import {Nav ,Navbar , NavDropdown,Container} from "react-bootstrap";


export function BuyerDash(){

    const [icon, setIcon] = useState(true);
    const [open,setOpen] = useState(false);
    const [Bdr,setBdr] = useState(true);
    const {logout} = useAuth();
    const history = useHistory();
      const handlelogout = async (e) => {
        await logout().then((user) => {
          history.push('./login')
      }
      )
    }
    function handleOpen(){
      setOpen(true)
    }


    return(<div style = {{
      position:"absolute",
        top:"0",
        left:"0",
        bottom:"0",
        right:"0",
        height:"100%",
        width:"100%",
        backgroundColor:"#5cdb95"
    }}>
            <Navbar expand ="lg" style = {{
              background: "#8ee4af",
              overflow:"visible",
              borderBottom: Bdr?"4px solid #05386B":"none",
            }} sticky = "top">
              <Navbar.Brand style = {{
                marginLeft: "50px",
                color:"#05386B",
                fontWeight: "500",
                fontSize:"22px",
                flexGrow: "10"
              }}>
                Supply Chain
              </Navbar.Brand>
              <Navbar.Toggle style = {{
                border:"none",
                color: "#05386B",
                fontSize:"25px"
              }}  onClick = {() => {setIcon(prev => !prev);setBdr(prev => !prev)}}>
                <i class = {icon?"fa fa-bars":"fa fa-times"} ></i>
              </Navbar.Toggle>
              <Navbar.Collapse>
              <Nav>
              <Nav.Link href="/home/trackproduct" >Track Product</Nav.Link>
              <Nav.Link onClick = {handleOpen}>About</Nav.Link>
              < NavDropdown title = "Profile">
                <NavDropdown.Item href="/home/profile">Update Profile</NavDropdown.Item>
                <NavDropdown.Item onClick = {handlelogout} >Logout</NavDropdown.Item>
            </NavDropdown>
              </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Container component="main" fluid>
                <Route path = "/home/profile" component = {UpdateProfile}></Route>
                <Route path = "/home/trackproduct" component = {TrackProduct}></Route>
                <About  open = {open} setOpen = {setOpen} />
            </Container>
            </div>
          )
}
