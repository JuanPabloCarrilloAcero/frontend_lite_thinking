import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {backendService} from "../../services/backendService";
import {AuthenticationRequest} from "../../models/AuthenticationRequest";
import setToken from "../../methods/localStorage/Token/setToken";
import {notify} from "../../methods/notify/notify";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import {Box, Button, Container, CssBaseline, IconButton, InputAdornment, Paper, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import setRole from "../../methods/localStorage/Role/setRole";

const Login = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const updateLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    }

    const handleLogin = async () => {
        updateLoading(true);
        try {
            const authDTO = ({user, password} as AuthenticationRequest);
            const response = await backendService("POST", "/auth/login", authDTO, false);

            const responseRole = await backendService("POST", "/auth/role", authDTO, false);

            setToken(response);
            setRole(responseRole[0].authority);

            navigate('/');

        } catch (e: any) {

            notify(e.message, 'error');

        }
        updateLoading(false);

    };

    if (loading) return (
        <LoadingScreen/>
    );

    return (
        <Container maxWidth="xs">
            <CssBaseline/>
            <Paper elevation={3} style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 10
            }}>
                <h1>Login</h1>
                <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={
                        {
                            endAdornment:
                                <Box>
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePasswordVisibility}>
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                </Box>
                        }
                    }
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                    style={{marginTop: 20}}
                >
                    Login
                </Button>
            </Paper>
        </Container>
    );
};

export default Login;