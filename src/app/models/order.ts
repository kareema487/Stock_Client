export interface IOrder {
    quantity: number,
    symbol: string,
    orderType: string,
    price:number,
    totalPrice:number,
    userEmail:string,
    orderDate:Date
}