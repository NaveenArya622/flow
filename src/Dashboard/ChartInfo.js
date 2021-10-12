import React, { useState} from 'react';
import SelectOption from "../FormIcon/SelectOption";
import {MenuItem} from "@mui/material";
import BarChart from "./BarChart";


const ChartInfo = ({to,v1,v2,
                       Label1,
                       Label2,
                       hading,
                       filterData={
    location:[{name:"All Location", value:0,}],
                           time:[{name:"Last 14 days", value:14},
                               {name:"Last 30 Days", value:30},
                               {name:"2 Months", value:60}]}}) => {
    const [data, setData] = useState({location: 0, time: 14});
    const handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        setData({...data,[name]: event.target.value});

    };
    return(
        <div className={"chart"}>
            <div className={"container"}>
                <h1>{hading}</h1>
                <form className={"form-container"}>
                    <div className={"location"}>
                        <SelectOption
                            fullWidth
                            name={"location"}
                            value={data.location}
                            onChange={handleChange}>{
                                filterData.location.map(({value,name})=>
                                    <MenuItem key={value} value={value}>{name}</MenuItem>)}
                        </SelectOption>
                    </div>
                    <div className={"time"}>
                        <SelectOption
                            fullWidth
                            name={"time"}
                            value={data.time}
                            onChange={handleChange}>{
                            filterData.time.map(({value,name})=>
                                <MenuItem key={value} value={value}>{name}</MenuItem>)}
                        </SelectOption>
                    </div>
                    <div className={"types"}>
                        <div className={"label1"}/>
                        <p>{Label1}</p>
                    </div>
                    <div className={"types"}>
                        <div className={"label2"}/>
                        <p>{Label2}</p>
                    </div>
                </form>
            </div>
             <BarChart data={data} to={to} v1={v1} v2={v2} />
        </div>
    );
}

export default ChartInfo;