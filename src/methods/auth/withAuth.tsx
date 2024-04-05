import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import hasToken from "../localStorage/Token/hasToken";

const withAuth = (Component: React.FC) => {
    return (props: any) => {

        const navigate = useNavigate();
        const location = window.location.pathname;

        useEffect(() => {
            if (!hasToken() && location !== "/login") {
                navigate("/logout");
            }
        }, [navigate]);

        return <Component {...props} />;

    };
};

export default withAuth;