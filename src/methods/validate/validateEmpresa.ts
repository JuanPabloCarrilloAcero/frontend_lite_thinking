import {Empresa} from "../../models/Empresa";
import {isStringEmpty} from "../../utils/isStringEmpty";

export function validateEmpresa (empresa: Empresa): { isValid: boolean, errors: string[] } {
    let isValid: boolean = true;
    let errors: string[] = [];

    if (isStringEmpty(empresa.nit)) {
        errors.push('Ingresa un NIT');
        isValid = false;
    }

    return {isValid: isValid, errors: errors};
}