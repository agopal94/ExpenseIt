export interface Transaction {
    type: "INCOME" | "EXPENSE",
    guid: string,
    category: string,
    value: number,
    ts: string
}