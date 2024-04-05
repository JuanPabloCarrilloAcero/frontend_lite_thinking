import {useEffect, useState} from "react";
import {notify, notifyArray} from "../../methods/notify/notify";
import {Autocomplete, Box, Button, Grid, MenuItem, Select, TextField} from "@mui/material";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import {isStringEmpty} from "../../utils/isStringEmpty";
import {Producto} from "../../models/Producto";
import {validateProducto} from "../../methods/validate/validateProducto";
import {mapProductoToSave} from "../../methods/map/mapProductoToSave";
import {backendService} from "../../services/backendService";
import {mapCaracteristicasToOption} from "../../methods/map/mapCaracteristicasToOption";
import {mapEmpresasToOption} from "../../methods/map/mapEmpresasToOption";

const ProductoForm = ({producto, update}: any) => {

    let canEditCodigo = false;

    if (isStringEmpty(producto.codigo)) {
        canEditCodigo = true;
    }

    const [productoData, setProductoData] = useState<Producto>(producto);
    const [caracteristicas, setCaracteristicas] = useState<any>([]);
    const [empresas, setEmpresas] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCaracteristicas().then();
        loadEmpresas().then();
    }, []);

    const loadCaracteristicas = async () => {
        try {
            const response = await backendService("GET", "/secure/caracteristicas/all", null, true);
            const options = mapCaracteristicasToOption(response);
            setCaracteristicas(options);
        } catch (e: any) {
            notify("Error cargando caracteristicas", "error");
        }
    }

    const loadEmpresas = async () => {
        try {
            const response = await backendService("GET", "/secure/empresas/all", null, true);
            const options = mapEmpresasToOption(response);
            setEmpresas(options);
        } catch (e: any) {
            notify("Error cargando empresas", "error");
        }
    }

    const updateLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    }

    const handleInputChange = (e: any, attribute: string) => {
        const {value} = e.target;

        setProductoData((prevData) => ({
            ...prevData,
            [attribute]: value,
        }));
    }

    const handleValueChange = (newValue: any, attribute: string) => {
        const value = newValue;

        setProductoData((prevData) => ({
            ...prevData,
            [attribute]: value,
        }));
    }

    const handleSave = async () => {

        try {
            updateLoading(true);

            const response = validateProducto(productoData);
            if (!response.isValid) {
                notifyArray(response.errors, "error");
                updateLoading(false);
                return;
            }

            const productoToSave = mapProductoToSave(productoData);

            const stringProducto = JSON.stringify(productoToSave);

            await backendService("POST", "/secure/productos/save", stringProducto, true);

            updateLoading(false);
            notify("Producto guardado", "success");

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
                            Producto
                        </h1>
                    </Grid>
                </Grid>

                <TextField
                    label="Código"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={isStringEmpty(productoData.codigo)}
                    value={productoData.codigo}
                    onChange={e => handleInputChange(e, "codigo")}
                    disabled={!canEditCodigo}
                />

                <TextField
                    label="Nombre"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={productoData.nombre}
                    onChange={e => handleInputChange(e, "nombre")}
                />

                <Autocomplete
                    sx={{mt: 2}}
                    multiple
                    options={caracteristicas}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => {
                        return value.value === option.value;
                    }}
                    fullWidth={true}
                    onChange={(event: any, newValue: any) => {
                        handleValueChange(newValue, "caracteristicas");
                    }}
                    value={productoData.caracteristicas}
                    renderInput={(params) => (<TextField
                        {...params}
                        label="Características"
                        placeholder="Características"
                    />)}
                />

                <Grid container spacing={2}
                      sx={{
                          marginTop: 0
                      }}
                >
                    <Grid item xs={4}>
                        <Select
                            value={productoData.moneda}
                            onChange={e => handleInputChange(e, "moneda")}
                            fullWidth={true}
                            sx={{
                                marginTop: 2
                            }}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"EUR"}>EUR</MenuItem>
                            <MenuItem value={"GBP"}>GBP</MenuItem>
                            <MenuItem value={"COP"}>COP</MenuItem>
                            <MenuItem value={"JPY"}>JPY</MenuItem>
                            <MenuItem value={"CAD"}>CAD</MenuItem>
                            <MenuItem value={"AUD"}>AUD</MenuItem>
                            <MenuItem value={"CHF"}>CHF</MenuItem>
                            <MenuItem value={"CNY"}>CNY</MenuItem>
                            <MenuItem value={"MXN"}>MXN</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={8}>
                        <TextField
                            label="Precio"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={productoData.precio}
                            onChange={e => handleInputChange(e, "precio")}
                            InputProps={{
                                inputMode: "numeric",
                            }}
                        />
                    </Grid>

                </Grid>

                <Autocomplete
                    sx={{mt: 2}}
                    options={empresas}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => {
                        return value.value === option.value;
                    }}
                    fullWidth={true}
                    onChange={(event: any, newValue: any) => {
                        handleValueChange(newValue, "empresa");
                    }}
                    value={productoData.empresa}
                    renderInput={(params) => (<TextField
                        {...params}
                        label="Empresa"
                        placeholder="Empresa"
                    />)}
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

export default ProductoForm;