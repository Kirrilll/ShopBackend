using ShopBackend.Domain.Entities;

namespace ShopBackend.Models.Orders
{
    public class ShopItemInOrder
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }

        public ShopItemInOrder(ShopItem item)
        {
            this.Id = item.ShopItemId;
            this.Name = item.Name;
            this.Price = item.Price;
        }

        public override bool Equals(object? obj)
        {
            return obj is ShopItemInOrder order &&
                   Id == order.Id;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Name, Price);
        }
    }
}
