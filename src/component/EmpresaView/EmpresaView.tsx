import {useEffect, useState} from "react";
import {Empresa} from "../../models/Empresa";
import {backendService} from "../../services/backendService";
import {notify} from "../../methods/notify/notify";
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../../constants/CustomNoRowsOverlay";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const EmpresaView = () => {

    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadEmpresas().then();
    }, []);

    const loadEmpresas = async () => {

        try {
            updateLoading(true);

            const response = await backendService("GET", "/secure/empresas/all", null, true);

            setEmpresas(response);
            updateLoading(false);
        } catch (e: any) {
            notify(e.message, "error");
            updateLoading(false);
        }

    }

    const updateLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    }

    const EmpresaDataGrid = () => {

        const columns = [
            {field: 'nit', headerName: 'NIT', flex: 1},
            {field: 'nombre', headerName: 'Nombre', flex: 1},
            {field: 'direccion', headerName: 'Direccion', flex: 1},
            {field: 'telefono', headerName: 'Telefono', flex: 1}
        ];


        return (

            <Box
                sx={{
                    mt: 4
                }}
            >

                <DataGrid
                    autoHeight
                    rows={empresas}
                    columns={columns}
                    getRowId={(row) => row.nit}
                    rowSelection={false}
                    slots={{noRowsOverlay: CustomNoRowsOverlay}}
                    sx={{
                        '--DataGrid-overlayHeight': '300px'
                    }}
                />

            </Box>


        )
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

            <h1>
                Empresas
            </h1>

            <EmpresaDataGrid/>
        </Box>
    )


}

export default EmpresaView;