import React, {useEffect, useMemo, useState} from "react";
import Action from "../FormIcon/Action";
import TabBar from "../FormIcon/TabBar";
import Tab from "@mui/material/Tab";
import "../Users/User.scss"
import {useParams} from "react-router";
import {getOrderData} from "../Data/serverData";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import BaseTable from "../FormIcon/BaseTable";

const apis = {
    "disputed": {api:"/api/store-manager/dashboard/order/",
        type: "disputed",
        columns: ["S.No.", "Order Id", "Delivery Address", "Date & Time", "Contact", "Action"]},
    "denied": {api:"/api/store-manager/dashboard/order/",
        type: "denied",
        columns: ["S.No.", "Order Id", "Delivery Address", "Contact", "Order Type", "Delivery Time"]},
    "scheduled": {api:"/api/store-manager/scheduled/orders",
        type: "",
        columns: ["S.No.", "Order Id", "Delivery Address", "Scheduled On", "Scheduled For", "Contact", "Action"]},
}

const Order = ({history}) => {
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
            <TabBar history={history} name={name} to={"/dashboard/order/"}>
                <Tab sx={{textTransform: "none", maxWidth: "2000px", width: "33.3%", border: 1, borderRadius: "10px 0 0 0"}}
                     value="denied" label="Denied Orders" />
                <Tab sx={{textTransform: "none", maxWidth: "2000px", width: "33.4%", border: 1}}
                     value="disputed" label="Disputed Orders" />
                <Tab sx={{textTransform: "none", maxWidth: "2000px", width: "33.3%", border: 1, borderRadius: "0 10px 0 0"}}
                     value="scheduled" label="Scheduled Orders" />
            </TabBar>
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
        </div>
    );
}
export default Order;