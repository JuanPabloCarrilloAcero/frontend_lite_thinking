export function mapCaracteristicasToOption(caracteristicas: any[]): any[] {
    return caracteristicas.map((caracteristica) => ({
        value: caracteristica.id,
        label: caracteristica.nombre,
    }));
}