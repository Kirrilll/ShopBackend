using ShopBackend.Data.Entities;

namespace ShopBackend.Dtos.ItemDtos
{
    public class ShopItemResponce
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }
        public string ImagePath { get; set; }
        public bool IsDeleted { get; set; }
        public ShopItemResponce(ShopItem item)
        {
            Price = item.Price;
            Name = item.Name;
            Count = item.Count;
            Id = item.ShopItemId;
            ImagePath = item.LogoPath;
            IsDeleted = item.IsDeleted;
        }

        public override bool Equals(object? obj)
        {
            return obj is ShopItemResponce responce &&
                   Id == responce.Id;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Name, Price, Count);
        }
    }
}
