import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import {notify} from "../../methods/notify/notify";
import deleteToken from "../../methods/localStorage/Token/deleteToken";
import deleteRole from "../../methods/localStorage/Role/deleteRole";

const Logout = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const updateLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    }

    useEffect(() => {
        handleLogout().then();
    }, []);

    if (loading) {
        return (
            <LoadingScreen/>
        )
    }

    const handleLogout = async () => {

        updateLoading(true);

        await new Promise((resolve) => {
            setTimeout(() => {
                deleteToken();
                deleteRole();
                resolve(null);
            }, 500);
        });

        updateLoading(false);

        deleteToken();
        deleteRole();

        notify("Logged out", "success");

        navigate("/login");
    }

    return null;
}

export default Logout;