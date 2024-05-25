export interface Account {
    openingBalance: number;
    accType: string;
}

export interface AccountDB {
    id: number;
    type: string;
    opening_balance: number;
}

export interface CategoryDB {
    id: number;
    cat: string;
}

export interface Transaction {
    guid: string
    type: string
    ts: string
    category: string
    value: number
    acc_id: number | undefined
}