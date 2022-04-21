using ShopBackend.Domain.Entities;

namespace ShopBackend.Domain
{
    public interface IShopRepository
    {
        Task<IEnumerable<ShopItem>> GetAll();
        Task<ShopItem>? Create(ShopItem item); 
        Task<ShopItem> Update(ShopItem item);
        Task<ShopItem?> GetById(int id);

    }
}
