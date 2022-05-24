export interface ShopItemOrder{
    id: number,
    price: number,
    name: string
}


export interface OrderContent{
    shopItemInOrder: ShopItemOrder,
    count: number
}

export interface Order{
    id: number,
    userId: number,
    orderContents: Array<OrderContent>,
    createdAt: Date,
    userName: string,
}