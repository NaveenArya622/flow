import {Button} from "@mui/material";
import { styled } from '@mui/material/styles';

const Action = styled(Button, {
    shouldForwardProp: (prop) => true,
})(({ styles, theme }) => ({
    background: "linear-gradient(180deg, #F88A12 0%, #CD2D05 100%) 0% 0% no-repeat padding-box",
    border: 0,
    width: "100%",
    textTransform: "capitalize",
    color: '#fff',
    padding: '0.5vw 2vw',
    ...styles
}));


export default Action;

