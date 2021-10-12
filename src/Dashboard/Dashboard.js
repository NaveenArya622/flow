import React from "react";
import { Helmet } from 'react-helmet';
import Menu from "./Menu";
import "./DashboardStyle.scss";
import ChartInfo from "./ChartInfo";


const Dashboard = ({history}) => {

    return (
        <main className={"dashboard"}>
            <Helmet>
                <title>Yourdaily-flow</title>
            </Helmet>
            <div className={"dashboard-container"}>
            <Menu history={history}/>
            <ChartInfo
                to={"/api/store-manager/dashboard/adg/"}
                v1={"acceptedOrders"}
                v2={"declinedOrders"}
                hading={"Accepted and denied booking graph"}
            Label1={"Accepted"}
            Label2={"Denied"}/>
            <ChartInfo
                to={"/api/store-manager/dashboard/nsg/"}
                v1={"nowOrders"}
                v2={"scheduledOrders"}
                hading={"Booking (Now vs Scheduled)"}
            Label1={"Now"}
            Label2={"Scheduled"}/>
        </div>
        </main>
    )

}
export default Dashboard;