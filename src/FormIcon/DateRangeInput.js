// import React, {useState} from "react";
// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
//
// const DateRangeInput = () => {
//     const [value, setValue] = useState([null, null]);
//
//     return (
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <Stack spacing={3}>
//                 <MobileDateRangePicker
//                     startText="Mobile start"
//                     value={value}
//                     onChange={(newValue) => {
//                         setValue(newValue);
//                     }}
//                     renderInput={(startProps, endProps) => (
//                         <React.Fragment>
//                             <TextField {...startProps} />
//                             <Box sx={{ mx: 2 }}> to </Box>
//                             <TextField {...endProps} />
//                         </React.Fragment>
//                     )}
//                 />
//             </Stack>
//         </LocalizationProvider>
//     );
// }
//
// export default DateRangeInput;