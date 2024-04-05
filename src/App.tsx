import React from 'react';
import './App.css';
import {ThemeProvider} from "@mui/material";
import {theme} from "./constants/theme";
import MainRouter from "./component/MainRouter/MainRouter";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <MainRouter/>
        </ThemeProvider>
    );
}

export default App;
