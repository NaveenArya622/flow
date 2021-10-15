import React, {useEffect, useCallback, useMemo, useState} from "react";
import Action from "../FormIcon/Action";
import TabBar from "../FormIcon/TabBar";
import Tab from "@mui/material/Tab";
import "../Users/User.scss"
import {useParams} from "react-router";
import {getOrderData, deleteOrder} from "../Data/serverData";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import BaseTable from "../FormIcon/BaseTable";
import {Checkbox} from "@mui/material";

const apis = {
    "disputed": {api:"/api/store-manager/dashboard/order/",
        type: "disputed",
        columns: ["S.No.", "Order Id", "Delivery Address", "Date & Time", "Contact", "Action"]},
    "denied": {api:"/api/store-manager/dashboard/order/",
        type: "denied",
        columns: ["S.No.", "Order Id", "Delivery Address", "Contact", "Order Type", "Delivery Time"]},
    "scheduled": {api:"/api/store-manager/scheduled/orders",
        type: "",
        columns: ["Order Id", "Delivery Address", "Date & Time", "Mode", "Amount", "Items", "Action"]},
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
    const onClickHandler = useCallback(
        async (event, type = "") => {
            switch (type) {
                case "Action": {
                    await deleteOrder("/api/store-manager/cancel/scheduled/order/",
                        event.target.name)
                   await getOrderData(apiData.api, apiData.type).then(data => {
                        setTableData(data);
                    })
                    break;
                }
                case "Order Id":
                    history.push(`disputed/${event.target.name}`);
                    break;
                default:
            }
        }
        , [apiData,history])
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
                                switch (item) {
                                    case "Order Id":
                                        return (apiData.type==="disputed"?
                                            <TableCell sx={{border: "1px solid gray"}} key={`${index}_${itemIndex}`}
                                                           align={"center"}>
                                                <Action name={items["Order Id"]}
                                                        style={{background: "#fff", color: "#000"}}
                                                        onClick={(event)=>onClickHandler(event, item)}>
                                                {items[item]}</Action>
                                            </TableCell>:
                                            <TableCell sx={{border: "1px solid gray"}} key={`${index}_${itemIndex}`}
                                                       align={"center"}>{
                                                items[item]
                                            }</TableCell>)
                                    case "Delivery Address":
                                        return (<TableCell sx={{border: "1px solid gray", width: 330}} key={`${index}_${itemIndex}`}
                                                           align={"center"}>
                                                {apiData.type===""?
                                            <a target="newTab" href={`https://www.google.com/maps/search/?q=${items.lat}${items.long}`}>{items[item]}</a>
                                            :items[item]}
                                        </TableCell>)
                                    case "Action":
                                        return (apiData.type===""?
                                                <TableCell sx={{border: "1px solid gray"}} key={`${index}_${itemIndex}`}
                                                           align={"center"}>{
                                                <Action name={items["Order Id"]}
                                                        onClick={(event)=>onClickHandler(event, item)}>Cancel</Action>
                                        }</TableCell>:
                                            <TableCell sx={{border: "1px solid gray"}} key={`${index}_${itemIndex}`}
                                                                 align={"center"}>{

                                            <Checkbox style={{margin: 0, color: "#21F812"}}
                                                      disabled={true}
                                                      checked={items[item] ? true : false}
                                                      color="success"/>
                                            }Resolved</TableCell>)
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
        </div>
    );
}
export default Order;