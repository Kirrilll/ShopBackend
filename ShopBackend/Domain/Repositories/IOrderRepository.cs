using ShopBackend.Domain.Entities;
using ShopBackend.Models;

namespace ShopBackend.Domain.Repositories
{
    public interface IOrderRepository
    {
        Task< IEnumerable<Order>> FindAll();    
        Task<Order?> FindById(int id);
        Task<Order?> Delete(int id);
        Task Update(Order order);
        Task<Order?> Create(OrderRequest order);
    }
}
