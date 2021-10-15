import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import DialogBox from "../FormIcon/DialogBox";
import {getOrderDetails} from "../Data/serverData";
import {DialogContent} from "@mui/material";

const OrderDetails = ({history}) => {
    const {name, id} = useParams();
    const [details, setDetails] = useState({})
    const onClose = useCallback(() => {
        history.goBack();
    }, [history]);
    useEffect(() => {
        getOrderDetails("/api/store-manager/dashboard/order/", name, `/${id}`).then(res => {
            console.log(res);
            setDetails(res);
        })
        return ()=>{
            setDetails({});
        }
    }, [id,name]);
  return(
      <DialogBox openDialog={true} onClose={onClose}>
          <DialogContent sx={{padding: 1, maxWidth: 1440, border: "none", height: "fit-content"}}
                         dividers>
            <div className={"details-container"}>
              <div className={"order-detail"}>
                <div className={"user-container"}>
                  <figure className={"profile"}>
                      <img src={"/ProjectImage/Profile.svg"} alt={"Profile"}/>
                  </figure>
                    <div className={"input"}>
                      <div>{details.orderId}</div>
                      <div>{details.userName}</div>
                      <div className={"no-bold"}>{details.userPhone}</div>
                    </div>
                </div>
                <div className={"staff-container"}>
                    <hr/>
                  <div className={"input"}>
                      <div className={"label"}>Order Mode</div>
                      <div className={"value"}>{details.orderMode}</div>
                  </div>
                  <div className={"input"}>
                      <div className={"label"}>Deliver By</div>
                      <div className={"value"}>{details.staffName}</div>
                  </div>
                  <div className={"input"}>
                      <div className={"label"}>Contact</div>
                      <div className={"value"}>{details.staffPhone}</div>
                  </div>
                  <div className={"input"}>
                      <div className={"label"}>Total Amount</div>
                      <div className={"value"}>{details.amount}</div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
      </DialogBox>
      )
}
export default OrderDetails;