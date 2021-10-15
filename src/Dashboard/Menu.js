import React, {useEffect, useState} from "react";
import Card from "./Card";
import {getDashboardData} from "../Data/serverData";
import Action from "../FormIcon/Action";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const initial = {
    activeUsers:"NA",
    bookingForLastWeek:"NA",
    cartBoyCount:"NA",
    deliveryBoyCount:"NA",
    deniedOrder:"NA",
    disputedOrder:"NA",
    onGoingOrder:"NA",
    scheduledOrder:"NA",
    totalItems:"NA",
    unapprovedStaff:"NA",
    unassignedOrders: "NA",
    userCount:"NA",
}
const Menu = ({history}) => {
    const [cards,setCards] = useState(initial);
    useEffect(()=>{
        getDashboardData("/api/store-manager/dashboard/stats").then(data =>{
            setCards(data);
        })
    },[]);
    const onClickHandler = (event) => {
        history.push(event.target.name);
    }
    return (
        <main className={"home-menu"}>
            <div className={"cards-container"}>
                <ul className={"cards"}>
                    <li key={0}>
                        <Card history={history}
                              id={0}
                              name= "/dashboard/users/cart-boy">
                            <div className={`card-text item${0}`}>
                                <p>Total Cart Person</p>
                                <h1>{cards.cartBoyCount==="NA"?
                                    <Box sx={{ display: 'flex', marginTop: 3 }}>
                                        <CircularProgress sx={{color: "#F88A12"}} />
                                    </Box>:cards.cartBoyCount}</h1>
                            </div>
                            <Action
                                styles={{borderRadius: '0 0 10px 10px', margin: 0}}
                                type="button"
                                name= "/dashboard/users/cart-boy"
                                onClick={onClickHandler}
                            >View Details</Action>
                        </Card>
                    </li>
                        <li key={1}>
                            <Card history={history}
                                  id={1}
                                  name="/dashboard/users/delivery-boy">
                                <div className={`card-text item${1}`}>
                                    <p>Total Delivery Boy</p>
                                    <h1>{cards.deliveryBoyCount==="NA"?
                                        <Box sx={{ display: 'flex', marginTop: 3 }}>
                                            <CircularProgress sx={{color: "#F88A12"}} />
                                        </Box>:cards.deliveryBoyCount}</h1>
                                </div>
                                <Action
                                    styles={{borderRadius: '0 0 10px 10px', margin: 0}}
                                    type="button"
                                    name="/dashboard/users/delivery-boy"
                                    onClick={onClickHandler}
                                >View Details</Action>
                            </Card>
                        </li>
                        <li key={2}>
                            <Card history={history}
                                  id={2}
                                  name = "/dashboard/users/users">
                                <div className={`card-text item${2}`}>
                                    <p>Total Users</p>
                                    <h1>{cards.userCount==="NA"?
                                        <Box sx={{ display: 'flex', marginTop: 3 }}>
                                            <CircularProgress sx={{color: "#F88A12"}} />
                                        </Box>:cards.userCount}</h1>
                                </div>
                                <Action
                                    styles={{borderRadius: '0 0 10px 10px', margin: 0}}
                                    type="button"
                                    name = "/dashboard/users/users"
                                    onClick={onClickHandler}
                                >View Details</Action>
                            </Card>
                        </li>
                        <li key={3}>
                            <Card history={history}
                                  id={3}
                                  name = "/dashboard/unassigned">
                                <div className={`card-text item${3}`}>
                                    <p>Unassigned order</p>
                                    <h1>{cards.unassignedOrders==="NA"?
                                        <Box sx={{ display: 'flex', marginTop: 3 }}>
                                            <CircularProgress sx={{color: "#F88A12"}} />
                                        </Box>:cards.unassignedOrders}</h1>
                                </div>
                                <Action
                                    styles={{borderRadius: '0 0 10px 10px', margin: 0}}
                                    type="button"
                                    name = "/dashboard/unassigned"
                                    onClick={onClickHandler}
                                >View Details</Action>
                            </Card>
                        </li>
                        <li key={4}>
                            <Card history={history}
                                  id={4}
                                  name = "/dashboard/items/1">
                                <div className={`card-text item${4}`}>
                                    <p>Total Items</p>
                                    <h1>{cards.totalItems==="NA"?
                                        <Box sx={{ display: 'flex', marginTop: 3 }}>
                                            <CircularProgress sx={{color: "#F88A12"}} />
                                        </Box>:cards.totalItems}</h1>
                                </div>
                                <Action
                                    styles={{borderRadius: '0 0 10px 10px', margin: 0}}
                                    type="button"
                                    name = "/dashboard/items/1"
                                    onClick={onClickHandler}
                                >View Details</Action>
                            </Card>
                        </li>
                        <li key={5}>
                            <Card history={history} id={5} name = "/dashboard/active">
                                <div className={`card-text item${5}`}>
                                    <p>Total Active Users</p>
                                    <p className={"hint"}>(Past 10 Days Order)</p>
                                    <h1>{cards.activeUsers==="NA"?
                                        <Box sx={{ display: 'flex', marginTop: 3 }}>
                                            <CircularProgress sx={{color: "#F88A12"}} />
                                        </Box>:cards.activeUsers}</h1>
                                </div>
                            </Card>
                        </li>
                        <li key={6}>
                            <Card history={history}
                                  id={6}
                                  name = "/dashboard/orders/ongoing">
                                <div className={`card-text item${6}`}>
                                    <p>Total Ongoing Booking</p>
                                    <h1>{cards.onGoingOrder==="NA"?
                                        <Box sx={{ display: 'flex', marginTop: 3 }}>
                                            <CircularProgress sx={{color: "#F88A12"}} />
                                        </Box>:cards.onGoingOrder}</h1>
                                </div>
                                <Action
                                    styles={{borderRadius: '0 0 10px 10px', margin: 0}}
                                    type="button"
                                    name = "/dashboard/orders/ongoing"
                                    onClick={onClickHandler}
                                >View Details</Action>
                            </Card>
                        </li>
                        <li key={7}>
                            <Card history={history}
                                  id={7}
                                  name = "/dashboard/orders/past">
                                <div className={`card-text item${7}`}>
                                    <p>Past Week Bookings</p>
                                    <h1>{cards.bookingForLastWeek==="NA"?
                                        <Box sx={{ display: 'flex', marginTop: 3 }}>
                                            <CircularProgress sx={{color: "#F88A12"}} />
                                        </Box>:cards.bookingForLastWeek}</h1>
                                </div>
                                <Action
                                    styles={{borderRadius: '0 0 10px 10px', margin: 0}}
                                    type="button"
                                    name = "/dashboard/orders/past"
                                    onClick={onClickHandler}
                                >View Details</Action>
                            </Card>
                        </li>
                        <li key={8}>
                            <Card history={history}
                                  id={8}
                                  name = "/dashboard/order/disputed">
                                <div className={`card-text item${8}`}>
                                    <p>Denied/Disputed order</p>
                                    <h1>{`${cards.deniedOrder}/${cards.disputedOrder}`==="NA/NA"?
                                        <Box sx={{ display: 'flex', marginTop: 3 }}>
                                            <CircularProgress sx={{color: "#F88A12"}} />
                                        </Box>:`${cards.deniedOrder}/${cards.disputedOrder}`}</h1>
                                </div>
                                <Action
                                    styles={{borderRadius: '0 0 10px 10px', margin: 0}}
                                    type="button"
                                    name = "/dashboard/order/disputed"
                                    onClick={onClickHandler}
                                >View Details</Action>
                            </Card>
                        </li>
                        <li key={9}>
                            <Card history={history}
                                  id={9}
                                  name = "/dashboard/order/scheduled">
                                <div className={`card-text item${9}`}>
                                    <p>Scheduled order</p>
                                    <h1>{cards.scheduledOrder==="NA"?
                                        <Box sx={{ display: 'flex', marginTop: 3 }}>
                                            <CircularProgress sx={{color: "#F88A12"}} />
                                        </Box>:cards.scheduledOrder}</h1>
                                </div>
                                <Action
                                    styles={{borderRadius: '0 0 10px 10px', margin: 0}}
                                    type="button"
                                    name = "/dashboard/order/scheduled"
                                    onClick={onClickHandler}
                                >View Details</Action>
                            </Card>
                        </li>
                </ul>
            </div>
        </main>
    );
}
export default Menu;