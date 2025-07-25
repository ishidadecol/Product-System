//MARK: FORMAT PRICE
export function formatPrice(valueInCents) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency : 'BRL'
    }).format(valueInCents / 100)
}