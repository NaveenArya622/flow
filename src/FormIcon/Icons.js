import React from 'react';
import PropTypes from "prop-types";

const Icons = ({type, ...props}) => {
    switch (type) {
        case 'PV':
            return <img className={'password-visible'} {...props} src={'/Icons/visibility.svg'} alt={"PV"}/>
        case 'PNV':
            return <img className={'password-in-visible'} {...props} src={'/Icons/visibilityOff.svg'} alt={"PNV"}/>
        case 'USR':
            return <img className={'user'} {...props} src={'/Icons/user.svg'} alt={"UI"}/>
        case 'Logo':
            return <img {...props} src={'/Icons/logo.svg'} alt={'LOGO'}/>
        case 'AddReq':
            return <img {...props} src={'/Icons/add request.png'} alt={'Acc Req'}/>
        case 'Logout':
            return <img {...props} src={'/Icons/logout.svg'} alt={'Log Out'}/>
        case 'Flag':
            return <img {...props} src={'/Icons/flag.svg'} alt={'Flag'}/>
        case 'Edit':
            return <img {...props} src={'/Icons/edit.svg'} alt={'Edit'}/>
        default:
            return null;
    }
}
Icons.propTypes = {
    type: PropTypes.string.isRequired
}
export default Icons;