import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import DialogBox from "../FormIcon/DialogBox";
import {getOrderDetails} from "../Data/serverData";
import {DialogContent} from "@mui/material";

const initial= {
  category: "",
  vegetable_name: "",
  base_qty: "",
  price: 0,
  mrp: "",
  image: "",
  image_url: "",
}

const ItemPopup = ({history}) => {
  const {name, id} = useParams();
  const [details, setDetails] = useState(initial)
    const onClose = useCallback(() => {
        history.goBack();
    }, [history]);
  useEffect(()=>{
      getOrderDetails("/api/store-manager/item/",``,id).then(data => {
          console.log(data);
      setDetails(data);
  })
  },[name,id])
  return(
      <DialogBox openDialog={true} onClose={onClose}>
        <DialogContent sx={{padding: 1, maxWidth: 1440, border: "none", height: "fit-content"}}
                       dividers>
        </DialogContent>
      </DialogBox>
  )
}
export default ItemPopup;