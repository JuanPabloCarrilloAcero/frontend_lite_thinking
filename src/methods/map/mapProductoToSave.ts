import {Producto} from "../../models/Producto";

export function mapProductoToSave(producto: Producto) {

    let mappedProducto = {...producto};

    mappedProducto.caracteristicas = mappedProducto.caracteristicas.map((caracteristica: any) => {
        return caracteristica.value;
    });

    if (mappedProducto.empresa && mappedProducto.empresa.value) {
        mappedProducto.empresa = mappedProducto.empresa.value;
    } else {
        mappedProducto.empresa = null;
    }

    return mappedProducto;
}