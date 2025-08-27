export interface OrderDetails {
    orderId: number,
    pkID:number,
    productId: number,
    productName: string,
    unitPrice: number,
    quantity: number,
    discount: number,
    order: null,
    product: null
}

export interface Orders {
    data: OrderDetails[],
}