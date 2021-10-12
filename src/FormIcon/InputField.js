import {TextField} from "@mui/material";
import React from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';


const InputField = ({label,styles={},...props}) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#000000",
            },
        }
    });
    return (
        <ThemeProvider theme={theme}>
            <TextField
                style={styles}
                label={label}
                placeholder={`enter your ${label.toLowerCase()}`}
                id={label}
                variant="outlined"
                {...props}
                fullWidth
                focused
            />
        </ThemeProvider>);
}
export default InputField;