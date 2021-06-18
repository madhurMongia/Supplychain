/*colors scheme #05386B #379683 #5cdb95 #8ee4af #EDF5E1 */

import React,{useRef ,useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useAuth} from "../contexts/authContext";
import {useBlock} from "../contexts/blockContext";
import QrReader from 'react-qr-reader';
import {
    Container,
  Typography,
  Grid,
  Button,
  Divider,
  Snackbar,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => (
    {
        input: {
            color:" #05386B !important",
            fontWeight:"400 !important",
            fontSize: "20px",
            marginTop:"0px",
            marginBottom:"0px"
          },

        notchedOutline:{
            borderWidth:"none !important",
            border:"none !important"
        },
        divide: {
            background: "#EDF5E1 !important",
            height:"70px",
        }
        
    }
))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function FetchLocation(props){
    const style = useStyles()

    const handleClose = () => {
       props.setOpen(false);
   };

   function LocDisp(props){
       return(
           <Grid item xs = {12}>
               <Grid container justify = "center">
           {props.index !== 1 ?<Divider orientation ="vertical" className = {style.divide}/>:null}
           </Grid>
           <Grid container justify = "center">
               <Typography variant = "h6" style = {{
                   color:"#EDF5E1",
                   fontSize:"18px",
                   fontWeight:"350"
               }}>{props.location}</Typography>
           </Grid>
           </Grid>
       )
   }
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
>{"Every Location of this Product:"}</DialogTitle>
   <DialogContent>
       <Grid container>
       {props.locations.map((value , index) => {
           if(value === '' ){
               return
           }else{
       return <LocDisp location ={value} key = {index} index = {index}/>
        }
        })}
       </Grid>
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

export function TrackProduct(){
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenErr(false)
      };
    const [id,setId] = useState();
    const {trackProduct , fetchOwner,fetchLocations} = useBlock();
    const {addressToName} = useAuth();
    const [name,setName] = useState();
    const [date,setDate] = useState();
    const [cLoc,setCLoc] = useState();
    const [owner,setOwner] = useState();
    const [err,setErr] = useState(false);
    const [openErr,setOpenErr] = useState(false);
    const [locations,setLocations] = useState(["Enter Product ID first"]);
    const qrRef = useRef(5);

    async function handleScan(){
        qrRef.current.openImageDialog();
    }
    async function handleFetchInfo(id){
        try {
            if(!id){
                throw("Please enter Product ID")
            }
            const dataRaw = await trackProduct(id)
            const Address = await fetchOwner(id)
            const Locations = await fetchLocations(id)
            const data = dataRaw.split(",")
            setLocations(Locations)
            if(data[0]){
            const ownerRaw = await addressToName(Address)
            setOwner(ownerRaw)
            setName(data[0])
            setCLoc(data[1])
            const temp = new Date(data[2]*1000)
            const dat = temp.getDate();
            var month = temp.getMonth();
            var year = temp.getFullYear();
            var fullDate = dat + "/" +(month + 1) + "/" + year;

            setDate(fullDate)

            }
            else {
                throw("No Product registed with entered ID.")
            }
        }
        catch(error){
            setErr(error)
            setOpenErr(true)
        }
    }

    const style = useStyles();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return(
    <Grid container spacing = {3} style = {{
        transform:"translateY(10%)"
    }}>
                    {openErr &&<Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                       {err}
                    </Alert>
                    </Snackbar>}
        <Grid item xs = {12}>
    <Container>
    <Grid container>
    <Grid xs = {11}>
    <TextField
    fullWidth
    type = "number"
    placeholder="Search Product ID"
    min
    variant= "outlined"
    size = "small"
    margin = "none"
    style = {{
        background:"#5cdb95",
        border: "5px solid #05386B",
        color:"05386B"
    }}
    disableUnderline = "true"
    InputProps={{
        classes : {
            notchedOutline:style.notchedOutline,
            input:style.input
        },
        inputProps: { min: 0}
    }} onChange = {(e) => setId(e.target.value)}
    />
        </Grid>

            <Grid item xs = {1} style = {{
                border:"5px solid #05386B",
                borderLeft:"none"
            }}>
                <Grid container justify = 'center' alignItems = "center">
    <i class="fas fa-search" style = {{
        fontSize:"25px",
        color: "#05386B",
        transform:"translateY(30%)",
        cursor: "pointer"
    }} onClick = {() => {handleFetchInfo(id)}}></i></Grid>
    </Grid>
        </Grid>
    </Container>
    </Grid>

    <Grid container justify = "center" >
             <span style = {{marginTop:"7px" ,color: "#05386B" ,fontWeight:"650"}}>OR</span>
         </Grid>
         <Grid container justify = "center" style = {{
         }}>
         <Button size = "small"><i class="fas fa-qrcode" style = {{
                    color:"#05386B",
                    fontSize:"15px"
                }}></i><div style = {{
                    fontSize:"16px",
                    color:"#05386B",
                    marginLeft:"2px",
                }} onClick = {handleScan}>Scan QR</div></Button></Grid>
         <QrReader
         ref={qrRef}
        delay={300}
        onScan={(result) => {
            try{
            if(!result){
                throw({ message: "Please Upload a valid image"})
            }
            handleFetchInfo(result)
        }
        catch(error){
            setErr(error.message)
            setOpenErr(true)}
        }}
        onError = { (error) => { setErr(error)
            setOpenErr(true)}}
        legacyMode
        />

    <Grid item xs = {12}>
        <Grid container justify = "center" alignItems = "center">
    <Box style = {{
        background:"#05386B",
        marginTop:"50px",
        justifySelf:"center",
        width: "500px",
        padding:"30px",
        color:"#EDF5E1",


        borderRadius: "4px",
        boxShadow: "0px 0px 12px 2px rgba(15, 15, 15, 0.2)"
        
    }}>
        <Grid container spacing = {8}>
            <Grid item xs = {12}>
                <Grid container spacing  = {3}  justify = "center" >
                    <Grid item xs = {6}><h5  style = {{fontWeight:"350"}}className = "labelText">Product Name:</h5></Grid>
                    <Grid item xs = {6}><h6 style = {{
                        fontSize:"20px",
                        fontWeight:"350"
                    }}>{name}</h6></Grid>
                </Grid>
            </Grid>

            <Grid item xs = {12}>
                <Grid container spacing  = {3}  justify = "center" >
                    <Grid item xs = {6}><h5  style = {{fontWeight:"350"}}className = "labelText">Current Owner:</h5></Grid>
                    <Grid item xs = {6}><h6 style = {{
                        fontSize:"20px",
                        fontWeight:"350"
                    }}>{owner}</h6></Grid>
                </Grid>
            </Grid>

            <Grid item xs = {12}>
                <Grid container row spacing  = {1}>
                    <Grid item xs = {6}><h5 style = {{fontWeight:"350"}}  className = "labelText">Registered on:</h5></Grid>
                    <Grid item xs = {6}><h6 style = {{
                        fontSize:"20px",
                        fontWeight:"350"
                    }}>{date}</h6></Grid>
                </Grid>
            </Grid>

            <Grid item xs = {12}>
                <Grid container row spacing  = {1}>
                    <Grid item xs = {6}><h5 style = {{ fontWeight:"350"}}  className = "labelText">Current Location:</h5></Grid>
                    <Grid item xs = {6}><h6 style = {{
                        fontSize:"20px",
                        fontWeight:"350"
                    }}>{cLoc}</h6></Grid>
                </Grid>
            </Grid>

            <Grid item xs = {12}>
            <Grid container justify = "center">
            <h6 style = {{
        cursor: "pointer",

    }} onClick ={handleClickOpen}>Tap to know every location</h6>
            </Grid>
            </Grid>
        </Grid>
        <FetchLocation  open = {open} setOpen = {setOpen} locations = {locations}/>
    </Box>
    </Grid>
    </Grid>
    </Grid>)
}