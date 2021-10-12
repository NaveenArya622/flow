import React from "react";
import {Dialog, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";



const DialogBox = ({children, openDialog =true, bsx={}, hsx={},heading="", onClose=()=>{openDialog="false"}}) => {
    return (<Dialog
        className={'popUpContainer'}
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
    >
     <DialogTitle sx={{  m: 0, p: "0.2vw 0", ...hsx }}
            id= "customized-dialog-title"
            onClose={onClose}>{heading}{onClose ? (
         <IconButton
             aria-label="close"
             onClick={onClose}
             sx={{
                 position: "absolute",
                 right: 8,
                 top: 0,
                 color: "#F88A12",
                 ...bsx
             }}
         >
             <CloseIcon />
         </IconButton>
     ) : null}
     </DialogTitle>{
        children
    }
    </Dialog>)

}

export default DialogBox;