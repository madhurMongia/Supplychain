import React ,{useRef,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import QrReader from 'react-qr-reader';
import {useBlock} from '../contexts/blockContext';

import {
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Snackbar,
  TextField,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#05386B !important",
    display: 'flex',
    height: 224,
    '.MuiBox-root-13':{
        padding:"0px !important"
    }
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
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

    divide: {
        backgroundColor: "#EDF5E1"
    }
}));

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export function Scan(props){
  const classes = useStyles();
  const [sopen,setsOpen] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const [id, setId] = useState();
  const [locat,setLocat] = useState();
  const [address,setAddress] = useState();
  const { updateLocation ,productCount} = useBlock();
    const [err, setErr] = useState(false);
    const qrRef = useRef(5);

    function handleScan(){
      qrRef.current.openImageDialog();
  }
    async function submitValues(){
      try{
        if(!locat){
          throw({
            message:"Please Enter Location"
          })
        }
          if(!id){
            throw({
              message:"Please Enter Product ID"
            })
        }

        if(!address){
          throw({
            message:"Please Enter new Owner"
          })
        }
        const check = await productCount(id)
        if(id > check){
          throw({
            message:"No Product registed with entered ID."
          })
        }
      await updateLocation(locat,id,address)
      setsOpen(true);
      }
      catch(error){
        setErr(error.message)
        setOpenErr(true)
      }
    }
  const handleClose = () => {
    setsOpen(false);
    setOpenErr(false);
};

return <div style = {{
  display : "flex",
  justifyContent:"center"
}}><Paper style = {{
  padding:"15px 100px 25px 100px",
  right: "-50%",
  alignItems:'center',
  background:"#05386B",
  color:"#EDF5E1",
  marginTop: "200px",
  Width:"500px",
}}>
  {sopen &&<Snackbar open={sopen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                       Location Updated Successfully!!
                    </Alert>
                    </Snackbar>}
                    {openErr &&<Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                       {err}
                    </Alert>
                    </Snackbar>}
    <Grid container justify = "center" style = {{
             marginTop:"10px"
         }}>
           <Grid container justify = "center">
           <Typography variant = "h5" style = {{
                        fontWeight:"320",
                    }}>Update Location:</Typography></Grid>
                    <Grid item xs = {12} justify= "center" alignItems= "center">
                   <Divider className = {classes.divide} style = {{
                       marginBottom:"40px"
                   }}></Divider> 
                </Grid>

                <Grid container justify = "center" style = {{
         }}>
             <TextField
                    id = "id"
                    name = "id"
                    label = "Enter Product ID"
                    type = "number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps = {{
                       className : classes.label,
                       
                    }}
                    InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                          input : classes.input
                        }
                      }}
                      
                       onChange = {(e) => setId(e.target.value)}
                    />
         </Grid>
         <Grid container justify = "center" style = {{
         }}>
             <span style = {{marginTop:"10px"}}>OR</span>
         </Grid>

         <Button size = "small" onClick = {handleScan}><i class="fas fa-qrcode" style = {{
                    color:"#EDF5E1",
                    fontSize:"15px"
                }}></i><div style = {{
                    fontSize:"16px",
                    color:"#EDF5E1",
                    marginLeft:"2px",
                }}>Scan QR</div></Button>
           <QrReader
         ref={qrRef}
        delay={300}
        onScan={(result) => {
            try{
            if(!result){
                throw({ message: "Please Upload a valid image"})
            }
            setId(result)
        }
        catch(error){
          setErr(error.message)
          setOpenErr(true)}
        }}
        onError = { (error) => { setErr(error.message)
          setOpenErr(true)}}
        legacyMode/>
         </Grid>

         <Grid container justify = "center" style = {{
             marginTop:"10px"
         }}>
             <TextField
                    id = "location"
                    name = "location"
                    label = "Update Location"
                    type = "text"
                    variant="outlined"
                    size="small"
                    InputLabelProps = {{
                       className : classes.label,
                       
                    }}
                    InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                          input : classes.input
                        }
                      }}
                       onChange = {(e) => setLocat(e.target.value)}
                      
                    />
         </Grid>

         <Grid container justify = "center" style = {{
             marginTop:"10px"
         }}>
             <TextField
                    id = "address"
                    name = "address"
                    label = "new Owner"
                    type = "text"
                    variant="outlined"
                    size="small"
                    InputLabelProps = {{
                       className : classes.label,
                       
                    }}
                    InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                          input : classes.input
                        }
                      }}
                       onChange = {(e) => setAddress(e.target.value)}
                      
                    />
         </Grid>

         <Grid container justify = "center" style = {{
             marginTop:"20px"
         }}>
         <Button size = "small" style = {{
             background:"#5cdb95",
             color: "#05386B"
         }} onClick = {submitValues}>Update</Button></Grid></Paper></div>
        }