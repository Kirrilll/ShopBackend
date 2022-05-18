using ShopBackend.Data.Entities;

namespace ShopBackend.Dtos.OrdersDtos
{
    public class ShopItemInOrder
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }

        public ShopItemInOrder(ShopItem item)
        {
            Id = item.ShopItemId;
            Name = item.Name;
            Price = item.Price;
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
