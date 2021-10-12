import React, {useCallback, useEffect, useMemo, useState} from "react";
import DialogBox from "../FormIcon/DialogBox";
import {DialogContent} from "@mui/material";
import Icons from "../FormIcon/Icons";
import {useParams} from "react-router";
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import {getUserData} from "../Data/serverData";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const initial= {
    "Average Rating": 0,
    Canceled: 0,
    Contact: "",
    Denied: 0,
    Flagged: 0,
    Name: "",
    "Registration Date": "dd/mm/yyyy",
    "Top Three Items": ["","",""],
    "Top Three Locations": ["","",""],
    "Total Orders": 0,
    id: 0
}


const Demo = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
}));


const apis = {
    "cart-boy": {
        api: "/api/store-manager/dashboard/staff/",
        type: "cart-boy",
    },
    "delivery-boy": {
        api: "/api/store-manager/dashboard/staff/",
        type: "delivery-boy",
    },
    "users": {
        api: "/api/store-manager/dashboard/user/details",
        type: "",
    },
}

const Dialog = ({history}) => {
    const {name, id} = useParams();
    const [details, setDetails] = useState(initial)
    const apiData = useMemo(() => {
        return apis[name]
    }, [name])
    const onClose = useCallback(() => {
        history.goBack();
    }, [history])
    useEffect(() => {
        getUserData(apiData.api, apiData.type, `/${id}`).then(res => {
            console.log(res)
            setDetails(res[0]);
        })
        return ()=>{
            setDetails(initial);
        }
    }, [apiData, id])
    console.log(details)
    return (
        <DialogBox openDialog={true} onClose={onClose}>
            <div className={"dialog-form"}>
                <figure className={"profile"}>
                    <img src={details.Profile === "" ? "./Icon/profile.png" : details.Profile} alt={"Profile"}/>
                </figure>
                <div className={"form-container"}>
                    <div className={"input"}>
                        <div className={"label"}>Name</div>
                        <div className={"value"}>{details.Name}</div>
                    </div>
                    <div className={"input"}>
                        <div className={"label"}>Contact</div>
                        <div className={"value"}>{details.Contact}</div>
                    </div>
                    <div className={"input"}>
                        <div className={"label"}>Reg. Date</div>
                        <div className={"value"}>{details["Registration Date"]}</div>
                    </div>
                </div>
            </div>
            <hr className={"hr"}/>
            <DialogContent sx={{padding: 1, maxWidth: 1440, border: "none", maxHeight: 786, height: "fit-content"}}
                           dividers>{
                apiData.type !== "" ? <div className={"cards"}>
                    <div className={"card"}>
                        <h1 className={"green-data"}>&#8377;{details["Total Business"]}</h1>
                        <p>Total Business</p>
                    </div>
                    <div className={"card"}>
                        <h1 className={"red-data"}>
                            <Icons styles={{width: 2, height: 2}} type={"Flag"}/>
                            {details.Flagged}
                        </h1>
                        <p>Flagged</p>
                    </div>
                    <div className={"card"}>
                        <h1 className={"orange-data"}>{details["Average Rating"]}&#10029;</h1>
                        <p>Avg. Rating</p>
                    </div>
                    <div className={"card"}>
                        <h1 className={"green-data"}>{details["Total Orders"]}</h1>
                        <p>Total Order</p>
                    </div>
                    <div className={"card"}>
                        <h1 className={"red-data"}>{details.Denied}</h1>
                        <p>Denied</p>
                    </div>
                    <div className={"card"}>
                        <h1 className={"orange-data"}>{details.Canceled}</h1>
                        <p>Cancel</p>
                    </div>
                </div> : <div className={"container"}>
                    <div className={"card-container"}>
                        <div className={"card"}>
                            <h1 className={"green-data"}>{details["Total Orders"]}</h1>
                            <p>Total Order</p>
                        </div>
                        <div className={"card"}>
                            <h1 className={"green-data"}>&#8377;{details["Total Amount"]}</h1>
                            <p>Total Amount</p>
                        </div>
                        <div className={"card"}>
                            <h1 className={"orange-data"}>{details.Canceled}</h1>
                            <p>Cancel</p>
                        </div>
                        <div className={"card"}>
                            <h1 className={"red-data"}>
                                <Icons styles={{width: 2, height: 2}} type={"Flag"}/>
                                {details.Flagged}
                            </h1>
                            <p>Flagged</p>
                        </div>
                        <div className={"card"}>
                            <h1 className={"orange-data"}>{details["Average Rating"]}&#10029;</h1>
                            <p>Avg. Rating</p>
                        </div>
                    </div>
                    <div className={"list-container"}>
                        <Grid item xs={12} md={6} sx={{margin: 1}}>
                            <Typography sx={{
                                textAlign: "center",
                                mt: 0, mb: 0,
                                padding: "5px 0",
                                color: "#fff",
                                background: "#F88A12 0% 0% no-repeat padding-box",
                                borderRadius: "15px 15px 0px 0px"
                            }}
                                        variant="h6" component="div">
                                Most Used Location
                            </Typography>
                            <Demo>
                                <List sx={{margin: 0, padding: 0,
                                    borderRadius: "0 0 15px 15px",
                                    height: "100%",
                                    boxShadow: "3px 3px 6px #00000029"}}>
                                    {
                                        details["Top Three Locations"].map((item, index) => {
                                            if (index === details["Top Three Locations"].length-1) {
                                                return (<ListItem sx={{
                                                    border: "1px solid #707070",
                                                    height: "fit-content",
                                                    minHeight: "60px",
                                                    borderTop: 0,
                                                    borderRadius: "0 0 15px 15px",
                                                }} key={`location${index}`}>
                                            <ListItemText
                                                primary={item}
                                            />
                                            </ListItem>)
                                            }
                                            return (
                                                <ListItem sx={{border: "1px solid #707070",
                                                    height: "fit-content",
                                                    borderTop: 0,
                                                    minHeight: "60px",}} key={`location${index}`}>
                                                <ListItemText
                                                    primary={item}
                                                />
                                            </ListItem>)
                                        })
                                    }
                                </List>
                            </Demo>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{margin: 1, height: "100%"}}>
                            <Typography sx={{
                                textAlign: "center",
                                mt: 0, mb: 0,
                                padding: "5px 0",
                                color: "#fff",
                                background: "#F88A12 0% 0% no-repeat padding-box",
                                borderRadius: "15px 15px 0px 0px",
                            }}
                                        variant="h6" component="div">
                                Top Three Ordered Item
                            </Typography>
                            <Demo>
                                <List sx={{margin: 0, padding: 0,
                                    borderRadius: "0 0 15px 15px",
                                    height: "90%",
                                    boxShadow: "3px 3px 6px #00000029"}}>
                                    {
                                        details["Top Three Items"].map((item, index) => {
                                            if (index === details["Top Three Items"].length-1) {
                                                return (<ListItem sx={{
                                                    border: "1px solid #707070",
                                                    borderTop: 0,
                                                    borderRadius: "0 0 15px 15px",
                                                    height: "fit-content",
                                                    minHeight: "60px",
                                                }}key={`item${index}`}>
                                                    <ListItemText
                                                        primary={item}
                                                    />
                                                </ListItem>)
                                            }
                                            return (<ListItem sx={{border: "1px solid #707070",
                                                height: "fit-content",
                                                borderTop: 0,
                                                minHeight: "60px",}}
                                                key={`item${index}`}>
                                                <ListItemText
                                                    primary={item}
                                                />
                                            </ListItem>)
                                        })
                                    }
                                </List>
                            </Demo>
                        </Grid>
                    </div>
                </div>
            }
            </DialogContent>
        </DialogBox>
    )

}
export default Dialog