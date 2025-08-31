export interface CategorySale{
 success: boolean,
 data: SaleDetails[]
}

export interface SaleDetails{
    ProductName: string,
    TotalPurchase: string
}