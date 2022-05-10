namespace ShopBackend.Domain.Entities
{
    public class ShopItem
    {
        public int ShopItemId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }
        public ICollection<Order> Orders { get; set; }

        public ShopItem()
        {
            this.Orders = new List<Order>();
        }

        public override bool Equals(object? obj)
        {
            return obj is ShopItem item &&
                   ShopItemId == item.ShopItemId;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(ShopItemId, Name, Price);
        }
    }
}
