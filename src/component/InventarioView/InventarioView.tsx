import {useEffect, useState} from "react";
import {notify} from "../../methods/notify/notify";
import {backendService} from "../../services/backendService";
import {mapEmpresasToOption} from "../../methods/map/mapEmpresasToOption";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import {Autocomplete, Box, Button, DialogActions, Grid, IconButton, Modal, TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {modalStyle} from "../../constants/modalStyle";
import ProductoForm from "../ProductoForm/ProductoForm";
import {Delete, Edit, PictureAsPdf} from "@mui/icons-material";
import CustomNoRowsOverlay from "../../constants/CustomNoRowsOverlay";
import {mappedProductToEdit} from "../../methods/map/mappedProductToEdit";
import EmpresaForm from "../EmpresaForm/EmpresaForm";

const InventarioView = () => {

    const [empresas, setEmpresas] = useState<any>([]);

    const [loading, setLoading] = useState(false);

    const [selectedEmpresa, setSelectedEmpresa] = useState<any>(null);

    const [empresaToEdit, setEmpresaToEdit] = useState<any>(null);

    const [showEmpresa, setShowEmpresa] = useState<boolean>(false);

    const [showEmailModal, setShowEmailModal] = useState<boolean>(false);

    useEffect(() => {
        loadEmpresas().then();
    }, []);

    const handleOpenEmpresa = () => {
        loadEmpresaById().then();
    }

    const handleDeleteEmpresa = () => {
        deleteEmpresaById().then();
    }

    const handlePDFEmpresa = () => {
        setShowEmailModal(true);
    }

    const handleCloseEmpresa = () => {
        setShowEmpresa(false);
    }

    const loadEmpresas = async () => {

        try {
            updateLoading(true);

            const response = await backendService("GET", "/secure/empresas/all", null, true);
            const options = mapEmpresasToOption(response);

            setEmpresas(options);
            updateLoading(false);
        } catch (e: any) {
            notify(e.message, "error");
            updateLoading(false);
        }

    }

    const loadEmpresaById = async () => {

        try {
            const response = await backendService("GET", `/secure/empresas/id/${selectedEmpresa.value}`, null, true);
            setEmpresaToEdit(response);
            setShowEmpresa(true);
        } catch (e: any) {
            notify(e.message, "error");
            updateLoading(false);
        }

    }

    const deleteEmpresaById = async () => {

        try {
            await backendService("DELETE", `/secure/empresas/delete/${selectedEmpresa.value}`, null, true);
            loadEmpresas().then();
            setSelectedEmpresa(null);
        } catch (e: any) {
            notify(e.message, "error");
            updateLoading(false);
        }

    }

    const updateLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    }

    const handleValueChange = (newValue: any) => {
        setEmpresaToEdit(null);
        setSelectedEmpresa(newValue);
    }

    const selectedEmpresaEmpty = selectedEmpresa === null || selectedEmpresa === undefined;

    const EmpresaDataGrid = () => {

        const [rows, setRows] = useState<any>([]);
        const [showModal, setShowModal] = useState<boolean>(false);
        const [selectedProduct, setSelectedProduct] = useState<any>(null);

        const columns = [
            {field: 'codigo', headerName: 'Código', flex: 1},
            {field: 'nombre', headerName: 'Nombre', flex: 1},
            {field: 'moneda', headerName: 'Moneda', flex: 1},
            {field: 'precio', headerName: 'Precio', flex: 1},
            {
                field: 'edit',
                headerName: 'Edit',
                flex: 1,
                sortable: false,
                filterable: false,
                renderCell: () => (
                    <strong>
                        <IconButton>
                            <Edit/>
                        </IconButton>
                    </strong>
                ),
            }
        ];

        useEffect(() => {
            loadProducts().then();
        }, []);

        const handleOpenModal = () => {
            setShowModal(true);
        }

        const handleCloseModal = () => {
            setShowModal(false);
        }

        const handleCellClick = (params: any) => {
            if (params.field === "edit") {
                handleOpenModal();

                const toEdit = mappedProductToEdit(params.row);

                setSelectedProduct(toEdit);
            }
        }

        const EditModal = () => {
            return (
                <Modal
                    open={showModal}
                    onClose={handleCloseModal}
                >
                    <Box sx={modalStyle}>
                        <ProductoForm producto={selectedProduct} update={updateLoading}/>
                    </Box>
                </Modal>
            )
        }

        const loadProducts = async () => {

            try {
                updateLoading(true);

                const response = await backendService("GET", `/secure/productos/byEmpresa/${selectedEmpresa.value}`, null, true);

                setRows(response);
                updateLoading(false);
            } catch (e: any) {
                notify(e.message, "error");
                updateLoading(false);
            }

        }


        return (

            <>
                <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.codigo}
                    rowSelection={false}
                    onCellClick={handleCellClick}
                    slots={{noRowsOverlay: CustomNoRowsOverlay}}
                    sx={{
                        '--DataGrid-overlayHeight': '300px'
                    }}
                />

                {
                    showModal ?
                        <EditModal/>
                        : null
                }

            </>


        )
    }

    const EmailModal = () => {

        const [email, setEmail] = useState<string>("carrilloacerojuanpablo@gmail.com");

        const handleSendEmail = async () => {

            try {
                updateLoading(true);

                const body = {
                    to: email,
                    body: selectedEmpresa.label
                }

                const response = await backendService("POST", "/secure/emails/send", body, true);

                notify(response, "success");
                updateLoading(false);
                setShowEmailModal(false);
            } catch (e: any) {
                notify(e.message, "error");
                updateLoading(false);
            }

        }

        return (
            <Modal
                open={showEmailModal}
                onClose={() => setShowEmailModal(false)}
            >
                <Box sx={modalStyle}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Button onClick={handleSendEmail}>Enviar correo</Button>
                </Box>
            </Modal>
        )
    }

    const handleUpdateEmpresa = () => {
        handleCloseEmpresa();
    }

    const EditEmpresa = () => {
        return (
            <Modal
                open={showEmpresa}
                onClose={handleCloseEmpresa}
            >
                <Box sx={modalStyle}>
                    <EmpresaForm empresa={empresaToEdit} update={handleUpdateEmpresa}/>
                </Box>
            </Modal>
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

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={6}>
                    <Autocomplete
                        sx={{mt: 2}}
                        options={empresas}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => {
                            return value.value === option.value;
                        }}
                        fullWidth={true}
                        onChange={(event: any, newValue: any) => {
                            handleValueChange(newValue);
                        }}
                        value={selectedEmpresa}
                        renderInput={(params) => (<TextField
                            {...params}
                            label="Empresa"
                            placeholder="Empresa"
                        />)}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}
                sx={{
                    mt: 4
                }}
            >
                <Grid item>
                    <h1>
                        {selectedEmpresaEmpty ? "Seleccione una empresa" : selectedEmpresa.label}
                    </h1>
                </Grid>

                <Grid item>
                    {
                        !selectedEmpresaEmpty ?
                            <IconButton onClick={handleOpenEmpresa}>
                                <Edit/>
                            </IconButton>
                            : null
                    }
                </Grid>

                <Grid item>
                    {
                        !selectedEmpresaEmpty ?
                            <IconButton onClick={handleDeleteEmpresa}>
                                <Delete/>
                            </IconButton>
                            : null
                    }
                </Grid>

                <Grid item>
                    {
                        !selectedEmpresaEmpty ?
                            <IconButton onClick={handlePDFEmpresa}>
                                <PictureAsPdf/>
                            </IconButton>
                            : null
                    }
                </Grid>
            </Grid>

            {
                !selectedEmpresaEmpty ?
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <EmpresaDataGrid/>
                        </Grid>
                    </Grid>
                    :
                    <>

                    </>
            }

            {
                showEmpresa ?
                    <EditEmpresa/>
                    : null
            }

            {
                showEmailModal ?
                    <EmailModal/>
                    : null
            }

        </Box>
    );

}

export default InventarioView;