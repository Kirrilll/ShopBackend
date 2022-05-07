using ShopBackend.Domain.Entities;

namespace ShopBackend.Models
{
    public class ShopItemResponce
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }

        public ShopItemResponce(ShopItem item)
        {
            this.Price = item.Price;
            this.Name = item.Name;
            this.Count = item.Count;
            this.Id = item.ShopItemId;
        }
    }
}
