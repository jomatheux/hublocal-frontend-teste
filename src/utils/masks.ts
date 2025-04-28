
export function cnpjMask(value: string): string {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1'); 
}

export function cepMask(value: string): string {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
}

export function onlyNumbers(value: string): string {
    return value.replace(/\D/g, '');
}

export function isValidCNPJ(cnpj: string): boolean {
    const strCNPJ = onlyNumbers(cnpj);

    if (strCNPJ.length !== 14) return false;

    if (/^(\d)\1+$/.test(strCNPJ)) return false;


    return true;
}

export function isValidCEP(cep: string): boolean {
    const strCEP = onlyNumbers(cep);
    return strCEP.length === 8;
}