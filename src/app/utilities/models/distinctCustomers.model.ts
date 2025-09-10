export interface DistinctCustomer {
    success: boolean;
    data: CustomerDetails[]
}

export interface CustomerDetails {
    customerId: number;
    contactName: string;
}