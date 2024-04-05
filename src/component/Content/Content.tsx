import {cloneElement, useEffect} from "react";
import {Box} from "@mui/material";
import {drawerWidth} from "../../constants/drawerWidth";
import {ToastContainer} from "react-toastify";
import withAuth from "../../methods/auth/withAuth";
import 'react-toastify/dist/ReactToastify.css';

const Content = ({children, leftMargin, title}: any) => {

    useEffect(() => {
        document.title = title ? title : "Technical test";
    }, [title]);

    return (
        <Box marginLeft={leftMargin ? `${drawerWidth}px` : 0} padding={8}>
            {cloneElement(children)}
            <ToastContainer />
        </Box>
    )

}

export default withAuth(Content);