import React, {useEffect, useCallback, useState} from "react";
import Action from "../FormIcon/Action";
import TabBar from "../FormIcon/TabBar";
import Tab from "@mui/material/Tab";
import "../Users/User.scss"
import "./item.scss"
import {useParams} from "react-router";
import BaseTable from "../FormIcon/BaseTable";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getOrderData, changeUser} from "../Data/serverData";
import {Checkbox} from "@mui/material";

const apiData={
    api: "/api/store-manager/",
    type: "item",
    columns: ["S.No", "Image","name", "Bese Qty.", "Price (per Base Qty.)", "In Stock"]
}

const Items = ({history}) => {
    const {name} = useParams();
    const [tabData,setTabData] = useState([])
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        getOrderData(apiData.api,"category").then(data => {
            console.log(data)
            setTabData(data);
        })
        getOrderData(apiData.api,apiData.type).then(data => {
            console.log(data)
            setTableData(data);
        })
        return ()=>{
            setTableData([]);
        }
    }, []);
    const onChangeHandler = useCallback(async (event,value) => {
        await changeUser(
            `/api/store-manager/item/`,event.target.name
            , JSON.stringify({category: parseInt(name), inStock:event.target.checked,...value}))
        await getOrderData(apiData.api, apiData.type).then(data => {
            setTableData(data);
        })
    }, [apiData])
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
            <TabBar history={history} name={parseInt(name)} to={"/dashboard/items/"}>
                {
                    tabData.map((tab,index)=>{
                        if(tabData.length===1){
                            return <Tab key={`cat_${index}`} sx={{textTransform: "none",
                                textTransform: "capitalize", maxWidth: "2000px",
                                width: `${100/tabData.length}%`, border: 1,
                                borderRadius: "10px 10px 0 0"}}
                                 value={tab.id} label={tab.category} />
                        }
                        if(index===0){
                            return <Tab key={`cat_${index}`} sx={{textTransform: "none",
                                textTransform: "capitalize",
                                maxWidth: "2000px",
                                width: `${100/tabData.length}%`, border: 1,
                                borderRadius: "10px 0 0 0"}}
                                        value={tab.id} label={tab.category} />
                        }
                        if(index===tabData.length-1){
                            return <Tab key={`cat_${index}`} sx={{textTransform: "none",
                                textTransform: "capitalize",
                                maxWidth: "2000px",
                                width: `${100/tabData.length}%`, border: 1,
                                borderRadius: "0 10px 0 0"}}
                                        value={tab.id} label={tab.category} />
                        }
                        return <Tab key={`cat_${index}`} sx={{textTransform: "none",
                            textTransform: "capitalize",
                            maxWidth: "2000px",
                            width: `${100/tabData.length}%`, border: 1,}}
                                    value={tab.id} label={tab.category} />
                    })
                }
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
                    tableData.filter(item=>item.categoryID===parseInt(name)).map((items, index) =>
                        <TableRow
                            key={`row_${index}`}>{
                            apiData.columns.map((item, itemIndex) => {
                                switch (item) {
                                    case "Image":
                                        return (<TableCell sx={{border: "1px solid gray",
                                            textTransform: "capitalize",}} key={`${index}_${itemIndex}`}
                                                           align={"center"}>{
                                                               items.Image!==null&&<figure className={"table-image"}>
                                            <img src={items[item]} alt={"item"} />
                                                               </figure>
                                        }</TableCell>)
                                    case "In Stock":
                                        return (<TableCell sx={{border: "1px solid gray",
                                            textTransform: "capitalize"}} key={`${index}_${itemIndex}`}
                                                           align={"center"}>{
                                            <Checkbox name={`${items["S.No"]}`}
                                                      style={{margin: 0, color: "#21F812"}}
                                                      onChange={event=>onChangeHandler(event,{"name": items.name,
                                                          "price": items["Price (per Base Qty.)"],
                                                          "baseQuantity": items["Bese Qty."]})} checked={items[item] ? true : false}
                                                      color="success"/>
                                        }</TableCell>)
                                    case "name":
                                        return (<TableCell sx={{border: "1px solid gray",
                                            width: 500,
                                            color: "#F88A12",
                                            textTransform: "capitalize"}} key={`${index}_${itemIndex}`}
                                                           align={"center"}>{
                                            items[item]
                                        }</TableCell>)
                                    case "Bese Qty.":
                                        return (<TableCell sx={{border: "1px solid gray",}}
                                                           key={`${index}_${itemIndex}`}
                                                           align={"center"}>{
                                            items[item]
                                        }</TableCell>)
                                    default:
                                        return (<TableCell sx={{border: "1px solid gray",
                                            textTransform: "capitalize"}} key={`${index}_${itemIndex}`}
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
export default Items;