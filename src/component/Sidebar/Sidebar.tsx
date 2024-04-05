import {Link, useLocation} from "react-router-dom";
import {Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {drawerWidth} from "../../constants/drawerWidth";
import {Apartment, Category, EmojiEmotions, Home, Inventory, Logout} from "@mui/icons-material";
import getRole from "../../methods/localStorage/Role/getRole";

const Sidebar = () => {

    const role = getRole();

    let options = [
        {name: "Empresas", path: "/empresas", icon: <Apartment/>},
    ];

    if (role === "ADMIN") {
        options.push(
            {name: "Nueva categoría", path: "/caracteristica/new", icon: <Category/>}
        )

        options.push(
            {name: "Nueva empresa", path: "/empresa/new", icon: <Apartment/>}
        )

        options.push(
            {name: "Nuevo producto", path: "/producto/new", icon: <EmojiEmotions/>}
        )

        options.push(
            {name: "Inventario", path: "/inventario", icon: <Inventory/>}
        )
    }

    const location = useLocation();

    return (
        <Drawer
            sx={{
                width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': {
                    width: drawerWidth, boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                <ListItem key={-1} disablePadding>
                    <ListItemButton component={Link} to={"/"}>
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary={"Inicio"}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                {options.map((item, index) => (
                    <ListItem key={index} disablePadding
                              style={{
                                  backgroundColor:
                                      item.path === location.pathname ? 'lightgray' : 'transparent',
                              }}
                    >
                        <ListItemButton component={Link} to={item.path}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to={"/logout"}>
                        <ListItemIcon>
                            <Logout/>
                        </ListItemIcon>
                        <ListItemText primary={"Cerrar sesión"}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )

}

export default Sidebar;