import React, {useEffect, useState} from "react";
import Action from "../FormIcon/Action";
import TabBar from "../FormIcon/TabBar";
import Tab from "@mui/material/Tab";
import "../Users/User.scss"
import {useParams} from "react-router";
import BaseTable from "../FormIcon/BaseTable";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getOrderData} from "../Data/serverData";

const apiData={
    api: "/api/store-manager/",
    type: "category",
    columns: ["id","category"]
}

const Items = ({history}) => {
    const {name} = useParams();
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        getOrderData(apiData.api,apiData.type).then(data => {
            console.log(data)
            setTableData(data);
        })
        return ()=>{
            setTableData([]);
        }
    }, []);
    return(
        <div className={"details"}>
            <div className={"details-head"}>
                <Action styles={{width: "fit-content",
                    background: "#ffffff",
                    border: "none",
                    color: "gray"}}
                        onClick={()=>{history.goBack()}}>Back</Action>
                <Action styles={{width: "fit-content",
                    background: "#ffffff",
                    color: "#F88A12",
                    border: "none"}}
                        onClick={()=>{history.goBack()}}>+ Add New Items</Action>
            </div>
            <TabBar history={history} name={name} to={"/dashboard/items"}>
                <Tab sx={{textTransform: "none", maxWidth: "2000px", width: "100%", border: 1, borderRadius: "10px 10px 0 0"}}
                     value="items" label="Items" />
            </TabBar>
            <BaseTable>
                <TableHead sx={{border: "1px solid gray", background: "#FFF0DF"}}>
                    <TableRow>{
                        apiData.columns.map((item, index) => {
                            return <TableCell sx={{border: "1px solid gray",
                                textTransform: "capitalize",}} key={`column_${index}`}
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
                                return (<TableCell sx={{border: "1px solid gray",
                                    textTransform: "capitalize"}} key={`${index}_${itemIndex}`}
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
export default Items;