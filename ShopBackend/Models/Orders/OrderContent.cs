namespace ShopBackend.Models.Orders
{
    public class OrderContent
    {
        public ShopItemInOrder ShopItemInOrder { get; set; }
        public int Count { get; set; }

        public static List<OrderContent> BuildFromDictionary(Dictionary<ShopItemInOrder, int> dict)
        {
            return dict.Select(pair => new OrderContent() { ShopItemInOrder = pair.Key, Count = pair.Value }).ToList();
        }
    }
}
