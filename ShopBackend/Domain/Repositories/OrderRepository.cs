using Microsoft.EntityFrameworkCore;
using ShopBackend.Domain.Entities;
using ShopBackend.Models;
using System.Linq;

namespace ShopBackend.Domain.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ShopContext _context;

        public OrderRepository(ShopContext context)
        {
            _context = context;
        }
        //TODO обрабатывать повторяющиеся элементы
        //TODO делать здесь update товара (изменять его кол-во)
        public async Task<Order?> Create(OrderRequest orderRequest)
        {
            var user = _context.users.FirstOrDefault<User>(user => user.UserId == orderRequest.UserId);
            if(user == null) return null;

            //var shopItems = _context.items
            //    .Where(item => orderRequest.shopItemsId
            //        .Contains(item.ShopItemId))
            //    .ToList();

            var shopItems = orderRequest.shopItemsId
                .Select(itemId => _context.items.Find(itemId)!)
                .ToList();
            
            var order = new Order();
            order.Items = shopItems;
            order.User = user;
            order.CreatedDate = DateTime.Now;
            _context.orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Order?> Delete(int id)
        {
            var order = await _context.orders.FindAsync(id);
            if(order == null) return null;
            _context.orders.Remove(order);
            await _context.SaveChangesAsync();
            return order;

        }

        public async Task<IEnumerable<Order>> FindAll()
        {
            return await _context.orders.ToListAsync();
        }

        public async Task<Order?> FindById(int id)
        {
            return await _context.orders.FindAsync(id);
        }

        public async Task Update(Order order)
        {
            _context.Entry<Order>(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
