import React, {useCallback, useEffect, useState} from "react";
import DialogBox from "../FormIcon/DialogBox";
import {getOrderData} from "../Data/serverData";
import "./Unassigned.scss"
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import BaseTable from "../FormIcon/BaseTable";
// /api/store-manager/dashboard/order/:orderType
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
            <TableHead sx={{border: "1px solid gray", background: "#FFF0DF"}}>
                <TableRow>{
                    apiData.columns.map((item, index) => {
                        return <TableCell sx={{border: "1px solid gray"}} key={`column_${index}`}
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
                            return (<TableCell sx={{border: "1px solid gray"}} key={`${index}_${itemIndex}`}
                                               align={"center"}>{
                                items[item]
                            }</TableCell>)

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