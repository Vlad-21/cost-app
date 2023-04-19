export interface IReport {
    amount: number,
    categoryName: string,
    transactionType: string
}
export interface IListReports {
    reportExpenses: Array<IReport>
}