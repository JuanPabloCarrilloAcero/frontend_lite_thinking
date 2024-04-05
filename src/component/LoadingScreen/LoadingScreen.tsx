import {Box, CircularProgress} from "@mui/material";

const LoadingScreen = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
            }}
        >
            <CircularProgress color="primary"/>
        </Box>
    )

}

export default LoadingScreen;