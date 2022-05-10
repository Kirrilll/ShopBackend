namespace ShopBackend.Domain.Entities
{
    public class ShopItem
    {
        public int ShopItemId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }
        public ICollection<OrderContent> Orders { get; set; }

        public ShopItem()
        {
            this.Orders = new List<OrderContent>();
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
