namespace ShopBackend.Data.Entities
{
    public class OrderContent
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ShopItemId { get; set; }
        public ShopItem ShopItem { get; set; }
        public Order Order { get; set; }

    }
}
