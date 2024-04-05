export interface Producto {
    codigo: string;
    nombre: string;
    caracteristicas: any;
    moneda: string;
    precio: string;
    empresa: any;
}

export function createNewEmptyProductoObject(): Producto {
    return {
        codigo: "",
        nombre: "",
        caracteristicas: [],
        moneda: "",
        precio: "",
        empresa: null
    };
}