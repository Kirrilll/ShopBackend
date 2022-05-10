namespace ShopBackend.Models.Orders
{
    public class OrderContentPart
    {
        public ShopItemInOrder ShopItemInOrder { get; set; }
        public int Count { get; set; }

        public static List<OrderContentPart> BuildFromDictionary(Dictionary<ShopItemInOrder, int> dict)
        {
            return dict.Select(pair => new OrderContentPart() { ShopItemInOrder = pair.Key, Count = pair.Value }).ToList();
        }
    }
}
