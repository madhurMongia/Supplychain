/*colors scheme #05386B #379683 #5cdb95 #8ee4af #EDF5E1 */

import React, {useState } from "react"
import { useAuth} from "../contexts/authContext";
import {makeStyles} from "@material-ui/core/styles";
import {database} from "../firebase";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocalStorage} from "../hooks/useLocalStorage"
import {
  Typography,
  Paper,
  Grid,
  Button,
  MenuItem,
  TextField,
  Divider,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const Roles = [
    "manufacturer",
    "exporter",
    "importer",
    "distributer",
    "retailer",
    "buyer"
]

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          borderColor: "#5cdb95 !important",
          Color: "#EDF5E1 !important"
        }},
    select: {
        color:"#EDF5E1 !important"
    },
    label : {
        color: "#EDF5E1 !important"
    },
    notchedOutline: {
        borderWidth: "2px",
        borderColor: "#5cdb95 !important",
        color:"#EDF5E1 !important"

      },
      input: {
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

      divide: {
          background: "#EDF5E1 !important",
      }
}))


export default  function UpdateProfile(props) {
        const { updatemail , updateRoleInBase,updatePass,currentUser , updateUserInBase ,updateAddressInBase} = useAuth()
        const style = useStyles()
        const [userRole,setUserRole] = useLocalStorage("role", " ")
        const [isPass,setisPass] = useState(false)
        const [isUser,setisUser] = useState(false)
        const [isAddr,setisAddr] = useState(false)
        const [isEmail,setisEmail] = useState(false)
        const [isRole,setisRole] = useState(false)
        const [err,setErr] = useState(0);
        const [open ,setOpen] = useState(false)
        const [openErr,setOpenErr] = useState(false)
        const [CUserName , setCUserName] = useState("Loading..")
        const [CAddr , setCAddr] = useState("Loading..")
        const [Crole,setCrole] = useState("Loading...")
        const promises = []


        function submitValues(values){
            if(values.email !== currentUser.email && values.email) {
                promises.push(updatemail(values.email))
            }
    
            if (values.password){
                promises.push(updatePass(values.password))
            }
    
            if(values.Role){
                promises.push(updateRoleInBase(values.Role,currentUser.uid))
                setUserRole(values.Role)
                window.location.reload();
            }

            if(values.address){
                promises.push(updateAddressInBase((values.Username ?null:CUserName),CAddr,values.address , currentUser.uid))
            }

            if(values.Username){
                promises.push(updateUserInBase(values.Username,currentUser.uid,(values.address ?values.address:CAddr)))
            }
            
            Promise.all(promises).then(() => {
                setOpen(true);
                setisUser(false);
                setisEmail(false);
                setisPass(false);
                setisRole(false);
                setisAddr(false);

            }).catch((error) => {
                setErr(error.message)
                setOpenErr(true)
            })
        
    }
        const formik = useFormik({
            initialValues: {
                Username:'',
                email: '',
                password: '',
                passwordConfirmation: '',
              },
            validationSchema: validationSchema,
            onSubmit: submitValues
            })
    const dbRef = database.ref();

        if(currentUser){
            dbRef.child("users").child(currentUser.uid).get().then((snapshot) => {
            if(snapshot.exists()){
                setCUserName(snapshot.val().username ? snapshot.val().username : "no User Name")
                setCrole(snapshot.val().role ? snapshot.val().role : "no Role found")
                setCAddr(snapshot.val().waddress ? snapshot.val().waddress : "no address found")
            }else {
                setErr("error loading data")
                setOpenErr(true)
            }
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false)
        setOpenErr(false)
      };

    function showUser() {
        setisUser((prev) => !prev)
    }
    function showEmail(){
        setisEmail((prev) => !prev)
    }
    function showPass(){
        setisPass((prev) => !prev)
    }

    function showRole(){
        setisRole((prev) => !prev)
    }

    function showAddr(){
        setisAddr((prev) => !prev)
    }


        return (
            <form onSubmit={formik.handleSubmit} style = {{
                justifyContent:"center",
                display:"flex",
                marginTop:"150px"
            }}>
            <Paper style = {{
                padding:"20px",

                right: "-50%",
                justifySelf:'center',
                alignItems:'center',
                background:"#05386B",
                color:"#EDF5E1",
                maxWidth:"450px",
                maxHeight:"500px",
                float:"center"
            }}>
                {open &&<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                       Profile Updated Successfully!!
                    </Alert>
                    </Snackbar>}
                    {openErr &&<Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                       {err}
                    </Alert>
                    </Snackbar>}
                <Grid  container spacing = {3}>

                    <Grid container justify = "center" alignItems ="center">
                        <Typography variant = "h2" style = {{
                            fontSize: "50px"
                        }}>Profile</Typography>
                    </Grid>
                    <Grid items xs = {12}>
                    <Divider className = {style.divide} style = {{
                    marginBottom:"30px"}}/>
                    </Grid>
                    <Grid item xs = {6}>
                    {isUser?
                        <TextField
                    id = "Username"
                    name = "Username"
                    label = "User Name"
                    type = "text"
                    variant="outlined"
                    size="small"
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
                    />:<Typography varient = "h4">{CUserName}</Typography>}
                    </Grid>
                    <Grid item xs = {6}>
                        <i class="fas fa-pencil-alt" onClick ={showUser} style = {{paddingLeft: "100px"}}></i>
                    </Grid>


                    <Grid item xs = {6}>
                    {isEmail?<TextField
                    id = "email"
                    name = "email"
                    label = "Email"
                    type = "text"
                    variant="outlined"
                    size="small"
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
                    />:<Typography varient = "h4">{currentUser.email}</Typography>}
                    </Grid>
                    <Grid item xs = {6}>
                        <i class="fas fa-pencil-alt" onClick ={showEmail} style = {{paddingLeft: "100px"}}></i>
                    </Grid>
                       
                    <Grid item xs = {6}>
                            {isPass?<TextField
                            id = "password"
                            name = "password"
                            label = "Password"
                            type = "password"
                            variant="outlined"
                            size="small"
                            color = "primary"
                            InputLabelProps = {{
                                className : style.label,
                                
                             }}
                             InputProps={{
                                 classes: {
                                   notchedOutline: style.notchedOutline,
                                   input : style.input
                                 },
                                 color: "#EDF5E1 !important"
                               }}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                            />:<Typography varient = "h4">Password</Typography>}
                    </Grid>
                    <Grid item xs = {6}>
                            <i class="fas fa-pencil-alt" onClick ={showPass}
                           style = {{paddingLeft: "100px"}}></i>
                    </Grid>


                            {isPass?<><Grid item xs = {6}><TextField
                            id = "passwordConfirmation"
                            name = "passwordConfirmation"
                            label = "Confirm Password"
                            type = "password"
                            variant="outlined"
                            size="small"
                            InputLabelProps = {{
                                className : style.label,
                                
                             }}
                             InputProps={{
                                 classes: {
                                   notchedOutline: style.notchedOutline,
                                   input : style.input
                                 }
                               }}
                               value={formik.values.passwordConfirmation}
                               onChange={formik.handleChange}
                               error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                               helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}/></Grid><Grid item xs = {6}>
                           </Grid></>:null}

                           <Grid item xs = {6}>
                               {isAddr?<TextField
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
                        :
                            <Typography style={{ wordWrap: 'break-word' }}varient = "h4">
                                Wallet Address</Typography>} </Grid>
                        <Grid item xs = {6}>
                        <i class="fas fa-pencil-alt" onClick ={showAddr}
                       style = {{paddingLeft: "100px"}}></i>
                </Grid>

                    <Grid item xs={6}>
                  {isRole?<TextField

                    id = "Role"
                    name = "Role"
                    fullWidth
                    select
                    variant = "outlined"
                    label="Select Role:"
                    className = {style.select}
                    InputLabelProps = {{
                        className : style.label,
                        
                     }}
                     InputProps={{
                         classes: {
                           notchedOutline: style.notchedOutline,
                           input : style.input
                         }
                        }}
                        value={formik.values.Role}
                        onChange={formik.handleChange}
                  >
                      {Roles.map( (role , index)=>(
                    <MenuItem value={role} key = {index}>{role}</MenuItem>
                      ))}
               </TextField>:<Typography varient = "h4">{Crole}</Typography>}
                </Grid>

                <Grid item xs = {6}>
                        <i class="fas fa-pencil-alt" onClick ={showRole} style = {{paddingLeft: "100px"}}></i>
                    </Grid>

                    </Grid>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center">
                    <Button className = {style.button}  type = "submit">Update</Button>
                    </Grid>
            </Paper>
            </form>
        )
    }
