using ShopBackend.Data.Entities;

namespace ShopBackend.Dtos.ItemDtos
{
    public class ShopItemRequest
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }
        public IFormFile? Image { get; set; }

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
