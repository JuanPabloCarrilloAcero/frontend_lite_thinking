export function mapEmpresasToOption(empresas: any[]): any[] {
    return empresas.map((empresa) => ({
        value: empresa.nit,
        label: empresa.nit,
    }));
}