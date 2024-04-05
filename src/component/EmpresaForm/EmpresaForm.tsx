import {useState} from "react";
import {Empresa} from "../../models/Empresa";
import {validateEmpresa} from "../../methods/validate/validateEmpresa";
import {notify, notifyArray} from "../../methods/notify/notify";
import {mapEmpresa} from "../../methods/map/mapEmpresa";
import {Box, Button, Grid, TextField} from "@mui/material";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import {isStringEmpty} from "../../utils/isStringEmpty";
import {backendService} from "../../services/backendService";

const EmpresaForm = ({empresa, update}: any) => {

    let canEditNit = false;

    if (isStringEmpty(empresa.nit)) {
        canEditNit = true;
    }

    const [empresaData, setEmpresaData] = useState<Empresa>(empresa);
    const [loading, setLoading] = useState(false);

    const updateLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    }

    const handleInputChange = (e: any, attribute: string) => {
        const {value} = e.target;
        setEmpresaData((prevData) => ({
            ...prevData,
            [attribute]: value,
        }));
    }

    const handleSave = async () => {

        try {
            updateLoading(true);

            const response = validateEmpresa(empresaData);
            if (!response.isValid) {
                notifyArray(response.errors, "error");
                updateLoading(false);
                return;
            }

            const empresa = mapEmpresa(empresaData);

            await backendService("POST", "/secure/empresas/save", empresa, true);

            updateLoading(false);
            notify("Empresa guardada", "success");

            if (update !== undefined) {
                update();
            }

        } catch (e: any) {
            notify(e.message, "error");
            updateLoading(false);
        }
    }

    if (loading) return (
        <LoadingScreen/>
    )

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    maxWidth: "100%",
                }}
            >

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <h1>
                            Empresa
                        </h1>
                    </Grid>
                </Grid>

                <TextField
                    label="NIT"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={isStringEmpty(empresaData.nit)}
                    value={empresaData.nit}
                    onChange={e => handleInputChange(e, "nit")}
                    disabled={!canEditNit}
                />

                <TextField
                    label="Nombre"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={isStringEmpty(empresaData.nombre)}
                    value={empresaData.nombre}
                    onChange={e => handleInputChange(e, "nombre")}
                />

                <TextField
                    label="Dirección"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={isStringEmpty(empresaData.direccion)}
                    value={empresaData.direccion}
                    onChange={e => handleInputChange(e, "direccion")}
                />

                <TextField
                    label="Teléfono"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={isStringEmpty(empresaData.telefono)}
                    value={empresaData.telefono}
                    onChange={e => handleInputChange(e, "telefono")}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSave}
                    sx={{
                        marginTop: 3,
                        marginBottom: 3,
                    }}
                >
                    Guardar empresa
                </Button>
            </Box>
        </Box>
    );


}

export default EmpresaForm;