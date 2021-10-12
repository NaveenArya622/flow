import React, {useCallback, useEffect, useMemo, useState} from "react";
import Action from "../FormIcon/Action";
import "./User.scss";
import TabBar from "../FormIcon/TabBar";
import Tab from "@mui/material/Tab";
import {useParams} from "react-router";
import {changeUser, getUserData} from "../Data/serverData";
import BaseTable from "../FormIcon/BaseTable";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Checkbox} from "@mui/material";

const apis = {
    "cart-boy": {
        api: "/api/store-manager/dashboard/staff/",
        type: "cart-boy",
        columns: ["Name", "Contact", "Registration Date", "Total Orders", "Denied", "Canceled", "Total Business", "Average Rating", "Flagged", "Enable/ Disable", "Action"]
    },
    "delivery-boy": {
        api: "/api/store-manager/dashboard/staff/",
        type: "delivery-boy",
        columns: ["Name", "Contact", "Registration Date", "Total Orders", "Denied", "Canceled", "Total Business", "Average Rating", "Flagged", "Enable/ Disable", "Action"]
    },
    "users": {
        api: "/api/store-manager/dashboard/user/details",
        type: "",
        columns: ["Name", "Contact", "Primary Location", "Total Orders", "Denied", "Canceled", "Average Rating", "Flagged"]
    },
}

const Users = ({history}) => {
    const {name} = useParams();
    const [tableData, setTableData] = useState([]);
    const apiData = useMemo(() => {
        return apis[name]
    }, [name])
    useEffect(() => {
        getUserData(apiData.api, apiData.type).then(data => {
            setTableData(data);
        })
        return ()=>{
            setTableData([]);
        }
    }, [apiData]);
    const onClickHandler =
        useCallback(
            async (event, type = "") => {
                switch (type) {
                    case "": {
                        history.push(`/dashboard/users/${name}/${event.target.name}`);
                        break;
                    }
                    case "change": {
                        await changeUser("/api/store-manager/staff/update/role",
                            "",
                            JSON.stringify({
                                "id": parseInt(event.target.name),
                                "newRole": name === "cart-boy" ? "delivery-boy" : "cart-boy"
                            }))
                        await getUserData(apiData.api, apiData.type).then(data => {
                            setTableData(data);
                        })
                        break;
                    }
                    default: {
                        await setTableData([...tableData.sort((a, b) => {
                            if (event.target.name === "ascending") {
                                if (a[type] > b[type])
                                    return 1;
                                if (a[type] < b[type])
                                    return -1;
                                return 0
                            }
                            if (a[type] < b[type])
                                return 1;
                            if (a[type] > b[type])
                                return -1;
                            return 0
                        })])
                        await console.log(tableData)
                    }

                }
            }
            , [apiData, tableData, name,history])
    const onChangeHandler = useCallback(async (event) => {
        await changeUser(
            `/api/store-manager/staff/${event.target.checked ? "enable" : "disable"}/`,
            event.target.name, "")
        await getUserData(apiData.api, apiData.type).then(data => {
            setTableData(data);
        })
    }, [apiData])
    return (
        <div className={"details"}>
            <div className={"details-head"}>
                <Action styles={{
                    width: "fit-content",
                    background: "#ffffff",
                    border: "none",
                    color: "gray"
                }}
                        onClick={() => {
                            history.goBack();
                        }}>Back</Action>
                {name !== "users" && <Action styles={{
                    width: "fit-content",
                    background: "#ffffff",
                    border: "none",
                    color: "#F88A12"
                }}
                                             onClick={() => {
                                                 history.replace("/dashboard")
                                             }}>+ Add
                    new {name.split("-").join(" ") === 'cart boy' ? 'Cart Person' : name.split("-").join(" ")}</Action>}
            </div>
            <TabBar history={history} name={name} to={"/dashboard/users/"}>
                <Tab sx={{
                    textTransform: "none",
                    maxWidth: "2000px",
                    width: "33.3%",
                    border: 1,
                    borderRadius: "10px 0 0 0"
                }}
                     value="cart-boy"
                     label="Cart Person Details"/>
                <Tab sx={{
                    textTransform: "none",
                    maxWidth: "2000px",
                    width: "33.4%",
                    border: 1}}
                     value="delivery-boy"
                     label="Delivery Boy Details"/>
                <Tab sx={{
                    textTransform: "none",
                    maxWidth: "2000px",
                    width: "33.3%",
                    border: 1,
                    borderRadius: "0 10px 0 0"
                }}
                     value="users"
                     label="User Details"/>
            </TabBar>
            <BaseTable>
                <TableHead sx={{border: "1px solid gray", background: "#FFF0DF"}}>
                    <TableRow>{
                        apiData.columns.map((item, index) => {
                            if ((index > 2 && index < 9) || item === "Registration Date")
                                return <TableCell sx={{border: "1px solid gray", padding: 0}} key={`column_${index}`}
                                                  align={"center"}>
                                    <div className={"text-buttons"}>
                                        <div>{item}</div>
                                        <div className={"buttons"}>
                                            <Action name={"descending"}
                                                    styles={{width: 30, minWidth: 0, background: "#00000000", padding: 0, color: "#000"}}
                                                    onClick={event => onClickHandler(event, item)}>&#9650;</Action>
                                            <Action name={"ascending"}
                                                    styles={{width: 30, minWidth: 0, background: "#00000000", padding: 0, color: "#000"}}
                                                    onClick={event => onClickHandler(event, item)}>&#9660;</Action>
                                        </div>
                                    </div>
                                </TableCell>
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
                                    case "Name":
                                        return (<TableCell sx={{padding: 0, margin: 0, border: "1px solid gray"}}
                                                           key={`${index}_${itemIndex}`} align={"center"}>{
                                            <Action styles={{
                                                minHeight: "100%",
                                                padding: 20,
                                                background: "#fff",
                                                color: "#F88A12"
                                            }}
                                                    onClick={event => onClickHandler(event)}
                                                    name={items.id}>{items[item]}</Action>
                                        }</TableCell>)
                                    case "Total Orders":
                                        return (<TableCell sx={{border: "1px solid gray", color: "#F88A12"}}
                                                           key={`${index}_${itemIndex}`} align={"center"}>{
                                            items[item]
                                        }</TableCell>)
                                    case "Denied":
                                        return (<TableCell sx={{border: "1px solid gray", color: "#FF0000"}}
                                                           key={`${index}_${itemIndex}`} align={"center"}>{
                                            items[item]
                                        }</TableCell>)
                                    case "Canceled":
                                        return (<TableCell sx={{border: "1px solid gray", color: "#4612F8"}}
                                                           key={`${index}_${itemIndex}`} align={"center"}>{
                                            items[item]
                                        }</TableCell>)
                                    case "Total Business":
                                        return (<TableCell sx={{border: "1px solid gray", color: "#21F812"}}
                                                           key={`${index}_${itemIndex}`} align={"center"}>Rs{
                                            items[item]
                                        }</TableCell>)
                                    case "Enable/ Disable":
                                        return (<TableCell sx={{border: "1px solid gray"}} key={`${index}_${itemIndex}`}
                                                           align={"center"}>{
                                            <Checkbox name={items.id.toString()} style={{margin: 0, color: "#21F812"}}
                                                      onChange={onChangeHandler} checked={items[item] ? true : false}
                                                      color="success"/>
                                        }</TableCell>)
                                    case "Action":
                                        return (<TableCell sx={{padding: 2, border: "1px solid gray"}}
                                                           key={`${index}_change`} align={"center"}>{
                                            <Action styles={{ width: 100,padding: 0}}
                                                    onClick={(event) => onClickHandler(event, "change")}
                                                    name={items.id}>Change Role</Action>
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
        </div>
    );
}
export default Users;