using ShopBackend.Domain.Entities;

namespace ShopBackend.Models
{
    public class ShopItemRequest
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }

        public ShopItem BuildShopItem()
        {
            return new ShopItem()
            {
                ShopItemId = 0,
                Name = Name,
                Price = Price,
                Count = Count
            };
        }
    }
}
