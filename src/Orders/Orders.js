import React, {useEffect, useMemo, useState} from "react";
import Action from "../FormIcon/Action";
import TabBar from "../FormIcon/TabBar";
import Tab from "@mui/material/Tab";
import "../Users/User.scss"
import DateRangePicker from 'rsuite/DateRangePicker';
import {useParams} from "react-router";
import {getOrderData} from "../Data/serverData";
import BaseTable from "../FormIcon/BaseTable";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DateRangeInput from "../FormIcon/DateRangeInput";


const apis = {
    "ongoing": {api:"/api/store-manager/dashboard/order/",
        type: "active",
        columns: ["Order Id", "Delivery Address","Contact", "Order Type / Order Mode", "Date & Time", "Items",]},
    "past": {api:"/api/store-manager/dashboard/order/",
        type: "history",
        columns: ["S.No.", "Order Id", "Delivery Address", "Contact", "Order Type", "Delivery Time"]},
}

const Orders = ({history}) => {
    const [tableData, setTableData] = useState([]);
    const {name} = useParams();
    const apiData = useMemo(() => {
        return apis[name]
    }, [name])
    useEffect(() => {
        getOrderData(apiData.api, apiData.type).then(data => {
            setTableData(data);
        })
        return ()=>{
            setTableData([]);
        }
    }, [apiData]);
  return(
    <div className={"details"}>
        <div className={"details-head"}>
            <Action styles={{width: "fit-content",
                background: "#ffffff",
                border: "none",
                color: "gray"}}
                    onClick={()=>{history.goBack()}}>Back</Action>
        </div>
        <TabBar history={history} name={name} to={"/dashboard/orders/"}>
            <Tab sx={{textTransform: "capitalize", maxWidth: "2000px", width: "50%", border: 1, borderRadius: "10px 0 0 0"}}
                 value="ongoing" label="Ongoing Orders" />
            <Tab sx={{textTransform: "capitalize", maxWidth: "2000px", width: "50%", border: 1, borderRadius: "0 10px 0 0"}}
                 value="past" label="Past Orders" />
        </TabBar>
        <BaseTable>
            <TableHead sx={{border: "1px solid gray", background: "#FFF0DF"}}>
                <TableRow>{
                    apiData.columns.map((item, index) => {
                        return <TableCell sx={{textTransform: "capitalize", border: "1px solid gray"}} key={`${name}_${index}`}
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
                            return (<TableCell sx={{textTransform: "capitalize", border: "1px solid gray"}} key={`${name}${index}_${itemIndex}`}
                                               align={"center"}>{
                                items[item]
                            }</TableCell>)

                        })
                    }
                    </TableRow>
                )}
            </TableBody>
        </BaseTable>
    </div>
  );
}
export default Orders;