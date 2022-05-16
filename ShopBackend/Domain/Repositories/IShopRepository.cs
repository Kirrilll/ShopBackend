using ShopBackend.Domain.Entities;
using ShopBackend.Models;

namespace ShopBackend.Domain.Repositories
{
    public interface IShopRepository
    {
        Task<IEnumerable<ShopItem>> GetAll();
        Task<ShopItem>? Create(ShopItemRequest item); 
        Task Update(ShopItemRequest item, int id);
        Task<ShopItem?> GetById(int id);
        Task<ShopItem?> Delete(int id);

    }
}
