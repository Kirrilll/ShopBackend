using ShopBackend.Data.Entities;
using ShopBackend.Dtos.ItemDtos;

namespace ShopBackend.Data.Repositories
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
