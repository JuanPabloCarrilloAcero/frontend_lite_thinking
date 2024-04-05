import {Producto} from "../../models/Producto";
import {isStringEmpty} from "../../utils/isStringEmpty";

export function validateProducto(producto: Producto): { isValid: boolean, errors: string[] } {
    let isValid: boolean = true;
    let errors: string[] = [];

    if (isStringEmpty(producto.codigo)) {
        errors.push('Ingresa un código');
        isValid = false;
    }

    return {isValid: isValid, errors: errors};

}