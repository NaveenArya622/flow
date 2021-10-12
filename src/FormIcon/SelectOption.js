import React from "react";
import {createTheme, styled} from "@mui/material/styles";
import {Select} from "@mui/material";
import {ThemeProvider} from "@mui/styles";

const SelectOption = ({children,styles,...props}) => {
    const Option = styled(Select, {
    shouldForwardProp: (prop) => true,
})(({ styles, theme }) => ({
        shadow: "0px 3px 6px #00000029",
        borderRadius: "10px",
        menu: {
            border: "1px black",
            borderRadius: "10px"
        },
        size: "2vw",
    ...styles
}));
    const theme = createTheme({
        palette: {
            primary: {
                main: "#000000",
            },
        }
    });
    return(
    <ThemeProvider theme={theme}>
        <Option {...props}>{
            children
        }</Option>
    </ThemeProvider>
    );
}
export default SelectOption;