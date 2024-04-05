export interface Empresa {
    nit: string;
    nombre: string;
    direccion: string;
    telefono: string;
}

export function createNewEmptyEmpresaObject(): Empresa {
    return {
        nit: "",
        nombre: "",
        direccion: "",
        telefono: ""
    };
}