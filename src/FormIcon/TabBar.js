import React, {useCallback} from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        secondary: {
            main: "#F88A12",
        },
    },
});

const TabBar = ({children, history, name,to=""}) => {

    const handleChange = useCallback((event, newValue) => {
        history.replace(`${to}${newValue}`);
    }, [history,to]);
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{width: '100%'}}>
                <Tabs className={"tab-container"}
                    value={name}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    {children}
                </Tabs>
            </Box>
        </ThemeProvider>
    );
}
export default TabBar;