using ShopBackend.Domain.Entities;

namespace ShopBackend.Domain
{
    public interface IShopRepository
    {
        Task<IEnumerable<ShopItem>> GetAll();
        Task<ShopItem>? Create(ShopItem item); 
        Task Update(ShopItem item);
        Task<ShopItem?> GetById(int id);
        Task<ShopItem?> Delete(int id);

    }
}
