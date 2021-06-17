/*colors scheme #05386B #379683 #5cdb95 #8ee4af #EDF5E1 */

import React, {useState } from "react"
import { useAuth} from "../contexts/authContext";
import {useHistory} from "react-router-dom";

import {makeStyles} from "@material-ui/core/styles";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  TextField,
  Divider,
  Snackbar,
  Container
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const validationSchema = yup.object({

    email: yup
      .string('Enter your email')
      .email('Enter a valid email'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length'),
  });

  const useStyle = makeStyles((theme)=>({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          borderColor: "#5cdb95 !important",
          Color: "#EDF5E1 !important"
        }},
          input:{
              color:"#EDF5E1 !important"
          },
          label:{
            color: "#EDF5E1 !important",
            fontSize:"17px"
          },
          notchedOutline:{
            borderWidth: "2px",
            borderColor: "#5cdb95 !important",
            color:"#EDF5E1 !important"
          },
          button: {
            backgroundColor: "#5cdb95",
            color: "#05386B",
            justifySelf:"center",
            marginTop: "20px",
            marginleft: "100px",
            "&:hover" :{
                backgroundColor:"#EDF5E1"
            }
        },
        divide:{
            background:"#EDF5E1 !important",
        }
  }))
export function Login() {

    const {login} = useAuth()
    const history = useHistory()
    const [err,setErr] = useState()
    const [open ,setOpen] = useState(false)
    const [openErr,setOpenErr] = useState(false)
    const style = useStyle()

    const formik = useFormik({
        initialValues: {

        },
        validationSchema: validationSchema,
        onSubmit: handleLogin
        })

    async function handleLogin(values) {

        try{
        await login(values.email,values.password)
             setErr(0) 
            history.push("./home/trackproduct")
            setOpen(true)
        }
        catch(error){
                setErr(error.message)
                setOpenErr(true)
            }
        }

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            setOpen(false)
            setOpenErr(false)
        }

        return (<div style = {{
          position:"absolute",
            top:"0",
            left:"0",
            bottom:"0",
            right:"0",
            height:"100%",
            width:"100%",
            backgroundColor:"#5cdb95"
        }}><Container maxWidth = "xs" style = {{ marginTop: "100px"}}>
        {open &&<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                  Login Successfully!!
                </Alert>
                </Snackbar>}
                {<Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                   {err}
                </Alert>
                </Snackbar>}
       <Paper
       style = {{
        padding:"20px",
        justifyContent:'center',
        alignItems:'center',
        background:"#05386B",
        color:"#EDF5E1",
        height: "540px"
       }}>
           <form onSubmit = {formik.handleSubmit}>
           <Grid container spacing = {2} style = {{
               MarginTop: "100px"
           }}>
               
               <Grid container justify = "center"  align="center">
                    <Typography variant = "h2" style = {{
                        fontSize: "50px"
                    }}>Login</Typography></Grid>

                <Grid item xs = {12} justify = "center" align="center" >
                <Divider className = {style.divide} />
                </Grid>

                <Grid item xs = {12}  justify = "center" align="center" style = {{
                    fontSize: "70px",
                }}>
                <i class="fas fa-sign-in-alt" ></i>
                </Grid>

               <Grid item xs = {12} justify = "center" align="center">
               <TextField
                id = "email"
                name = "email"
                label = "Email"
                type = "text"
                variant="outlined"
                InputLabelProps = {{
                    className : style.label,
                    
                 }}
                 InputProps={{
                     classes: {
                       notchedOutline: style.notchedOutline,
                       input : style.input
                     }
                   }}
                   value={formik.values.email}
                   onChange = {formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
               </Grid>

               <Grid item xs = {12} justify = "center" align="center">
               <TextField
                   id = "password"
                   name = "password"
                   label = "password"
                   variant = "outlined"
                   type = "password"
                   value={formik.values.password}
                   onChange={formik.handleChange}
                   InputProps = {{
                       classes:{
                            notchedOutline: style.notchedOutline,
                           input:style.input
                       }
                   }}
                   InputLabelProps = {{
                       className: style.label
                   }}
                   error = {formik.touched.password && Boolean(formik.errors.password)}
                   helperText = {formik.touched.password && formik.errors.password}/>
               </Grid>


               <Grid container xs = {12} justify = "center">
                   <Button type = "submit" className = {style.button} size = "large" >Login</Button>
                   </Grid>

                   <Grid container xs = {12} justify = "center">
                   <Link href="/#/signup" variant="body2" style = {{
                       paddingTop: "20px",
                       color:"#EDF5E1",
                       fontSize:"16px"
                   }} underline = "hover">
            Don't have an account? Sign Up
          </Link>
                   </Grid>
           </Grid>
           </form>
       </Paper>
       </Container>
       </div>)

}