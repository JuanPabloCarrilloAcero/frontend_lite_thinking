import {mapCaracteristicasToOption} from "./mapCaracteristicasToOption";

export const mappedProductToEdit = (product: any) => {

    let mappedProduct = {...product};

    mappedProduct.caracteristicas = mapCaracteristicasToOption(product.caracteristicas);

    mappedProduct.empresa = {value: product.empresaNit.nit, label: product.empresaNit.nit};

    return mappedProduct;
}