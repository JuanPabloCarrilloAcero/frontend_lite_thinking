export interface Caracteristica {
    id: any;
    nombre: string;
}

export function createNewEmptyCaracteristicaObject(): Caracteristica {
    return {
        id: "",
        nombre: ""
    };
}