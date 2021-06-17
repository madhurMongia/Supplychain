/*colors scheme #05386B #379683 #5cdb95 #8ee4af #EDF5E1*/

import React ,{useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {useBlock} from "../contexts/blockContext";
import QRCode from "qrcode";
import QrReader from 'react-qr-reader';
import {
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Snackbar,
  Box,Tab,Tabs,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  DialogContentText,
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box style = {{
              width: "300px",
              paddingLeft:"20px",
          }}>
              {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: "#05386B !important",
      display: 'flex',
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
          background: "#EDF5E1 !important",
          marginTop:"0px"
      }
  }));
  
function VerticalTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [locat, setLocat] = useState();
    const [address, setAddress] = useState();
    const [id, setId] = useState();
    const [name, setName] = useState();
    const qrRef = useRef(5);

    async function handleScan(){
        qrRef.current.openImageDialog();
    }
    async function handleUpdate(){
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
            message:"Please Enter new Address"
          })
        }
        const check = await props.pc(id)
        if(id > check){
          throw({
            message:"No Product registed with entered ID."
          })
        }
        await props.uloc(locat,id,address)
        props.setsOpen(true)
      }
    catch(error){
      props.setErr(error.message)
      props.setOpenErr(true)
    }
  }
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

   async function handleGen(){
    try {
      if(!name){
        throw({
          "message":"Please Enter Product Name"
        })
      }
        await props.addPro(name)
        props.handleClickOpen()
         }
      catch(error){
          props.setErr(error.message)
          props.setOpenErr(true)
        }
  }
    return (
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs"
          className={classes.tabs}
        >
          <Tab label="Add" {...a11yProps(0)} />
          <Tab label="Scan" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
            <Grid container spacing = {3} style = {{
                paddingTop:"0px"
            }}>
                <Grid container xs = {12} justify= "center" alignItems= "center">
                    <Typography variant = "h5" style = {{
                        fontWeight:"320",
                        marginTop:"20px"
                    }}>Enter Product details:</Typography>
                </Grid>

                <Grid item xs = {12} justify= "center" alignItems= "center">
                   <Divider className = {classes.divide} style = {{
                   }}></Divider> 
                </Grid>

                <Grid container xs = {12} justify= "center" alignItems= "center" style = {{
                    marginTop:"10px"
                }}>
          
                </Grid>
                <Grid container xs = {12} justify= "center" alignItems= "center" style = {{
                    marginTop:"25px"
                }}>
                <TextField
                    label = "Product Name"
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
                      onChange = {(e) => setName(e.target.value)}
                    required/>
                </Grid>

                <Grid container xs = {12} justify= "center" alignItems= "center" style = {{
                    paddingBottom:"20px",
                    marginTop:"20px"
                }}>
                <Button size = "small" onClick = {handleGen}><i class="fas fa-qrcode" style = {{
                    color:"#EDF5E1",
                    fontSize:"15px"
                }}></i><div style = {{
                    fontSize:"16px",
                    color:"#EDF5E1",
                    marginLeft:"2px",
                }}>Generate QR</div></Button>
                </Grid>
            </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
         <Grid container justify = "center" style = {{
         }}>
          <Grid container justify = "center" style = {{
                  }}>
                      <TextField
                              label = "Enter Product ID"
                              type = "number"
                              variant="outlined"
                              placeholder = { id?id:null}
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
          props.setErr(error.message)
          props.setOpenErr(true)}
        }}
        onError = { (error) => { props.setErr(error.message)
          props.setOpenErr(true)}}
        legacyMode
        />
         </Grid>

         <Grid container justify = "center" style = {{
             marginTop:"20px"
         }}>
             <TextField
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
             marginTop:"20px"
         }}>
             <TextField
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
         }} onClick = {handleUpdate}>Update</Button>
         </Grid>
        </TabPanel>
      </div>
    );
  }


function GenQR(props){

     const handleClose = () => {
        props.setOpen(false);
    };
    return(<Dialog
    open={props.open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
    PaperProps={{
        style: {
          backgroundColor: '#05386B',
        }
    }}
  >
    <DialogTitle id="alert-dialog-slide-title" style = {{
          color: '#EDF5E1',
        }}
>{"Genarated QR code"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description" style = {{
          color: '#EDF5E1',
          marginBottom:"5px"
        }}>
          Please tag the genarated QR code to the Product.
      </DialogContentText>
      <DialogContent id="alert-dialog-slide-description" style = {{
          color: '#EDF5E1',
          marginBottom:"5px",
          display: "flex",
          flexDirection:"row",
          justifyContent:"center",
        }}>
          {
          <a href={props.image} download>
          <img src={props.image} alt="img"/>
          </a>}
      </DialogContent>
      <DialogContentText id="alert-dialog-slide-description-2" style = {{
          color: '#EDF5E1'
        }}>
          Product ID:{props.pc}
      </DialogContentText>
    </DialogContent>
    <DialogActions >
      <Button onClick={handleClose} size = "small" style = {{
          backgroundColor: "#5cdb95",
          color: "#05386B",
          "&:hover" :{
              backgroundColor:"#EDF5E1"
          }
      }}>
        Close
      </Button>
    </DialogActions>
  </Dialog>)
  }

export function AddProduct(){

    const [open, setOpen] = useState(false);
    const [sopen, setsOpen] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const [err, setErr] = useState(false);
    const [imageUrl,setImageUrl] = useState();
    const [pc, setPc] = useState();
    const {addProduct,productCount,updateLocation} = useBlock();

    const handleClickOpen = async () => {
      const prod = await productCount()
         setPc(prod.toNumber());
    const response = await QRCode.toDataURL(prod.toNumber().toString(),{
      color:{
        dark: "#05386B",
        light: "#EDF5E1"
      },
      scale:"8",
      margin:"2"

    });
    setImageUrl(response)
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setsOpen(false)
        setOpenErr(false)
      };

   return(
       <div style = {{
        justifyContent:"center",
        padding:"30px",
        display:"flex",
        marginTop:"250px"
       }}>
           <Paper style = {{
                padding:"25px",
                right: "-50%",
                justifySelf:'center',
                alignItems:'center',
                background:"#05386B",
                color:"#EDF5E1",
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
                <VerticalTabs handleClickOpen = {handleClickOpen} setsOpen = {setsOpen} 
                addPro = {addProduct} setErr = {setErr}  setOpenErr = {setOpenErr} pc = {productCount} uloc = {updateLocation} />
                <GenQR open = {open} setOpen = {setOpen}  pc = {pc} image = {imageUrl}/>
           </Paper>
       </div>
   ) 
}