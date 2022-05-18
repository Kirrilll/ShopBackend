using ShopBackend.Data.Entities;
using ShopBackend.Dtos.OrdersDtos;

namespace ShopBackend.Data.Repositories
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> FindAll();
        Task<Order?> FindById(int id);
        Task<Order?> Delete(int id);
        Task Update(Order order);
        Task<Order?> Create(OrderRequest order);
    }
}
