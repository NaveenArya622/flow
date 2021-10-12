import React from "react";
import Icons from "../FormIcon/Icons";
import PropTypes from "prop-types";
import "./Header.scss"
import {Link} from "react-router-dom";

const Header = ({history}) => {

    const onclickHandler = (e) => {
        if (e.target.name.toLowerCase() === "add-req") {
            history.push("/req-list");
        }
        if (e.target.name.toLowerCase() === "log-out") {
            history.replace("/");
        }
    }

    return (
        <header className={"header"}>
            <div className={'heading'}>
                <Icons type={'Logo'}/>
                <h3><Link to={"/dashboard/home"}>Dashboard</Link></h3>
            </div>
            <div className={"icons"}>
                <Icons name={'add-req'} onClick={onclickHandler} type={'AddReq'}/>
                <Icons name={'log-out'} onClick={onclickHandler} type={'Logout'}/>
            </div>
        </header>
    );

}
Header.ptopTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
    })
}
export default Header;