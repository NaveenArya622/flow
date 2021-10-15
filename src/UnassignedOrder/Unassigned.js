import React, {useCallback, useEffect, useState} from "react";
import DialogBox from "../FormIcon/DialogBox";
import {getOrderData} from "../Data/serverData";
import Action from "../FormIcon/Action";
import "./Unassigned.scss"
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import BaseTable from "../FormIcon/BaseTable";
// /api/store-manager/dashboard/order/:orderType

// addressData: "RemoteState, RWA society, Sector 104, Noida, Uttar Pradesh, India"
// deliveryTime: "2021-10-13T10:30:00Z"
// orderId: 641
// orderMode: "cart"
// orderType: "scheduled"
// status: "processing"
// userPhone: "+919650674431"
const apiData={
    api: "/api/store-manager/dashboard/order/",
    type: "unassigned",
    columns: ["S.No", "Order Id", "Customer Address", "Contact", "Order Type", "Action", "Status"]
}
const Unassigned = ({history}) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        getOrderData(apiData.api, apiData.type).then(data => {
            console.log(data);
            setTableData(data);
        })
        return ()=>{
            setTableData([]);
        }
    }, []);
    const onClose = useCallback(() => {
        history.goBack();
    }, [history])
    return(
        <DialogBox openDialog={true}
                   heading={"Unassigned Orders"}
                   bsx={{color: "#fff"}}
                   hsx={{color: "#fff", minWidth: 300, padding: "5px 7vw", background: "#F88A12"}}
                   onClose={onClose}>
            <BaseTable>
            <TableHead sx={{border: "1px solid gray"}}>
                <TableRow>{
                    apiData.columns.map((item, index) => {
                        return <TableCell sx={{border: "1px solid gray", color: "#F88A12"}} key={`column_${index}`}
                                          align={"center"}>{item}</TableCell>
                    })
                }
                </TableRow>
            </TableHead>
            <TableBody>{
                tableData.map((items, index) =>
                    <TableRow
                        key={`row_${index}`}>{
                        apiData.columns.map((item, itemIndex) => {
                            switch (item) {
                                case "Customer Address":
                                    return (<TableCell sx={{border: "1px solid gray", color: "#777777"}} key={`${index}_${itemIndex}`}
                                                       align={"center"}>{
                                        items[item]
                                    }</TableCell>)
                                case "Order Type":
                                    return (<TableCell sx={{border: "1px solid gray", color: "#0E8B00"}} key={`${index}_${itemIndex}`}
                                                       align={"center"}>{
                                        items[item]
                                    }</TableCell>)
                                case "Action":
                                    return (<TableCell sx={{border: "1px solid gray", color: "#FF0000"}} key={`${index}_${itemIndex}`}
                                                       align={"center"}>{
                                                           <Action>Assign</Action>
                                    }</TableCell>)
                                case "Status":
                                    return (<TableCell sx={{border: "1px solid gray", color: "#FF0000"}} key={`${index}_${itemIndex}`}
                                                       align={"center"}>{
                                        items[item]
                                    }</TableCell>)
                                default:
                                    return (<TableCell sx={{border: "1px solid gray"}} key={`${index}_${itemIndex}`}
                                                       align={"center"}>{
                                        items[item]
                                    }</TableCell>)
                            }

                        })
                    }
                    </TableRow>
                )}
            </TableBody>
        </BaseTable>

        </DialogBox>
    )
}
export default Unassigned;