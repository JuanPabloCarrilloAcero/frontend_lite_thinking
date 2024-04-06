import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Box} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";
import Logout from "../Logout/Logout";
import {createNewEmptyEmpresaObject} from "../../models/Empresa";
import EmpresaForm from "../EmpresaForm/EmpresaForm";
import Login from "../Login/Login";
import ProductoForm from "../ProductoForm/ProductoForm";
import {createNewEmptyProductoObject} from "../../models/Producto";
import {createNewEmptyCaracteristicaObject} from "../../models/Caracteristica";
import CaracteristicaForm from "../CaracteristicaForm/CategoriaForm";
import InventarioView from "../InventarioView/InventarioView";
import EmpresaView from "../EmpresaView/EmpresaView";


const MainRouter = () => {

    let array = [];

    array.push({
        path: "/login", element: (
            <Box>
                <Content leftMargin={false}>
                    <Login/>
                </Content>
            </Box>
        ),
    });

    array.push({
        path: "*", element: (
            <Box>
                <Sidebar/>
                <Content leftMargin={true}>
                    <h1>404 - page not found</h1>
                </Content>
            </Box>
        ),
    });

    array.push({
        path: "/", element: (
            <Box>
                <Sidebar/>
                <Content leftMargin={true}>
                    <h1>Inicio</h1>
                </Content>
            </Box>
        ),
    });

    array.push({
        path: "/empresas", element: (
            <Box>
                <Sidebar/>
                <Content leftMargin={true}>
                    <EmpresaView/>
                </Content>
            </Box>
        ),
    });

    array.push({
        path: "logout", element: (
            <Box>
                <Sidebar/>
                <Content leftMargin={false}>
                    <Logout/>
                </Content>
            </Box>
        ),
    });

    array.push({
        path: "/empresa/new", element: (
            <Box>
                <Sidebar/>
                <Content leftMargin={true}>
                    <EmpresaForm empresa={createNewEmptyEmpresaObject()}/>
                </Content>
            </Box>
        ),
    });

    array.push({
        path: "/producto/new", element: (
            <Box>
                <Sidebar/>
                <Content leftMargin={true}>
                    <ProductoForm producto={createNewEmptyProductoObject()}/>
                </Content>
            </Box>
        ),
    });

    array.push({
        path: "/caracteristica/new", element: (
            <Box>
                <Sidebar/>
                <Content leftMargin={true}>
                    <CaracteristicaForm caracteristica={createNewEmptyCaracteristicaObject()}/>
                </Content>
            </Box>
        ),
    });

    array.push({
        path: "/inventario", element: (
            <Box>
                <Sidebar/>
                <Content leftMargin={true}>
                    <InventarioView/>
                </Content>
            </Box>
        ),
    });

    const router = createBrowserRouter(array);

    return (
        <RouterProvider router={router}/>
    );

}

export default MainRouter;