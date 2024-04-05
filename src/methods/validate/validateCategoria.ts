import {isStringEmpty} from "../../utils/isStringEmpty";
import {Caracteristica} from "../../models/Caracteristica";

export function validateCaracteristica (caracteristica: Caracteristica): { isValid: boolean, errors: string[] } {
    let isValid: boolean = true;
    let errors: string[] = [];

    if (isStringEmpty(caracteristica.nombre)) {
        errors.push('Ingresa un nombre');
        isValid = false;
    }

    return {isValid: isValid, errors: errors};
}