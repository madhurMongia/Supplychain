/*colors scheme #05386B #379683 #5cdb95 #8ee4af #EDF5E1 */

import React, { useState } from "react"
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
  MenuItem,
  TextField,
  Divider,
  Snackbar,
  Container
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Roles = [
    "manufacturer",
    "exporter",
    "importer",
    "distributer",
    "retailer",
    "buyer"
]

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
    passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
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
            background:"#EDF5E1 !important"
        }
  }))
export function Register(props) {
        const { signup} = useAuth()
        const {writeData} = useAuth()
        const style = useStyle()
        const [err,setErr] = useState(0);
        const history = useHistory();
        const [open ,setOpen] = useState(false)
        const [openErr,setOpenErr] = useState(false)
        const formik = useFormik({
            initialValues: {

            },
            validationSchema: validationSchema,
            onSubmit: submitValues
            })

            async function submitValues(values){
                try{
                await signup(values.email,values.password).then(async (user) =>{
                    await writeData(values.Username,values.role,user.user.uid,values.address).then((user) => {
                        setOpen(true);
                        history.push("./home/trackproduct")
                    }).catch((error) =>{
                        setErr(error.message)
                    })
                })
            }catch(error){
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
              };

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
        <Container component = "main" maxWidth = "xs" style = {{
            marginTop:"60px"
        }}>
            {open &&<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                       Profile Created Successfully!!
                    </Alert>
                    </Snackbar>}
                    {openErr &&<Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                       {err}
                    </Alert>
                    </Snackbar>}
           <Paper
           style = {{
            padding:"25px",
            justifyContent:'center',
            alignItems:'center',
            background:"#05386B",
            color:"#EDF5E1",
            height: "700px"
           }}>
               <form onSubmit = {formik.handleSubmit}>
               <Grid container spacing = {2} style = {{
                   MarginTop: "100px"
               }}>
                   
                   <Grid container justify = "center"  align="center">
                        <Typography variant = "h2" style = {{
                            fontSize: "50px"
                        }}>Sign Up</Typography></Grid>

                    <Grid item xs = { 12} >
                    <Divider className = {style.divide} style = {{
                                        marginBottom:"30px"}}/>
                    </Grid>
                   <Grid item xs = { 12} justify = "center" align="center">
                        <TextField
                    id = "Username"
                    name = "Username"
                    label = "User Name"
                    type = "text"
                    variant="outlined"
                    className = {style.textField}
                    InputLabelProps = {{
                       className : style.label,
                       
                    }}
                    InputProps={{
                        classes: {
                          notchedOutline: style.notchedOutline,
                          input : style.input
                        }
                      }}
                      value={formik.values.Username}
                       onChange = {formik.handleChange}
                    />
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

                   <Grid item xs = {12} align="center">
                   <TextField
                       id = "passwordConfirmation"
                       name = "passwordConfirmation"
                       label = "Confirm Password"
                       variant = "outlined"
                       type = "password"
                       value={formik.values.passwordConfirmation}
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
                       error = {formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                       helperText = {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}></TextField>
                   </Grid>

                   <Grid item xs = {12} align="center">
                   <TextField
                       id = "address"
                       name = "address"
                       label = "Wallet Address"
                       variant = "outlined"
                       type = "text"
                       value={formik.values.address}
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
                      ></TextField>
                   </Grid>

                   <Grid item xs = {12}>
                   <TextField
                   fullWidth
                   select
                      id = "role"
                       name = "role"
                       label = "Select your Role"
                       variant = "outlined"
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

                       >{Roles.map( (role , index)=>(
                    <MenuItem value={role} key = {index}>{role}</MenuItem>
                      ))}</TextField>
                   </Grid>

                   <Grid container xs = {12} justify = "center">
                       <Button type = "submit" className = {style.button} size = "large">Signup</Button>
                       </Grid>

                       <Grid container xs = {12} justify = "center">
                       <Link href="#/login" variant="body2" style = {{
                           paddingTop: "20px",
                           color:"#EDF5E1",
                           fontSize:"16px"
                       }} underline = "hover">
                Already have an account? Login
              </Link>
                       </Grid>
               </Grid>
               </form>
           </Paper>
           </Container>
           </div>
        ) 
    }
