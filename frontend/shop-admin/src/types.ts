export interface ShopItemOrder{
    id: number,
    price: number,
    count: number
}


export interface OrderContent{
    shopItemInOrder: ShopItemOrder,
    count: number
}

export interface Order{
    id: number,
    userId: number,
    orderContents: Array<OrderContent>,
    createdAt: Date
}