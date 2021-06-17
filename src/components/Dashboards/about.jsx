import React from "react";
import {
Typography,
Button,
Dialog,
DialogActions,
DialogContent,
DialogTitle,
} from '@material-ui/core';
import {} from "@material-ui/core";

export function About(props){

    const {open,setOpen} = props
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div>
             <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          About
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          This application provides platform for sellers and logistics companies to help
Their customers track orders. The application will have different login portals for
Distributer, buyers, and manufacturers.
Here is how the process work:
          </Typography>
          <Typography gutterBottom>
            <ul>
              <li>
              Manufacturer will add product on the portal and download a QR code generated
              after adding the product. The QR code will be tagged on the shipping box.
              </li>
              <li>
              Then at every freight hub the distributer can scan and update the location of the 
              product.
                </li>
                <li>
                Hence, when the product finally reach the retailer and consumers they can easily 
                check each and every location of the product.
                </li>
            </ul>
          </Typography>
          <Typography gutterBottom>
          The application will allow different stakeholders (manufacturers, importer, retailer etc.) to
          track the product at every step of the shipment process.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            close
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}