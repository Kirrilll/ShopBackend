using Microsoft.EntityFrameworkCore;
using ShopBackend.Data.Entities;
using ShopBackend.Dtos;
using ShopBackend.Dtos.OrdersDtos;
using System.Linq;

namespace ShopBackend.Data.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ShopContext _context;

        public OrderRepository(ShopContext context)
        {
            _context = context;
        }
        public async Task<Order?> Create(OrderRequest orderRequest)
        {
            var user = _context.users.FirstOrDefault<User>(user => user.UserId == orderRequest.UserId);
            if (user == null) return null;

            var shopItems = orderRequest.ShopItemsId
                .Select(itemId => _context.items.Find(itemId)!)
                .ToList();

            var itemsMap = new Dictionary<ShopItem, int>();
            foreach (var shopItem in shopItems)
            {
                if (itemsMap.ContainsKey(shopItem)) itemsMap[shopItem]++;
                else itemsMap.Add(shopItem, 1);
            }

            foreach (var shopItemKey in itemsMap.Keys)
            {
                if (shopItemKey.Count < itemsMap[shopItemKey])
                    return null;
                 shopItemKey.Count -= itemsMap[shopItemKey];
                _context.Entry(shopItemKey).State = EntityState.Modified;
            }

            var order = new Order()
            {
                CreatedDate = DateTime.Now,
                User = user,
                UserId = user.UserId,
            };
            order.Items = shopItems.Select(item => new OrderContent()
            {
                Order = order,
                OrderId = order.OrderId,
                ShopItem = item,
                ShopItemId = item.ShopItemId
            }).ToList();

            _context.orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Order?> Delete(int id)
        {
            var order = await _context.orders.FindAsync(id);
            if (order == null) return null;
            _context.orders.Remove(order);
            await _context.SaveChangesAsync();
            return order;

        }

        public async Task<IEnumerable<Order>> FindAll()
        {
            return await _context.orders
                .Include(order => order.User)
                .Include(order => order.Items)
                    .ThenInclude(content => content.ShopItem)
                .ToListAsync();
        }

        public async Task<Order?> FindById(int id)
        {
            return await _context.orders
                .Include(u => u.User)
                .Include(o => o.Items)
                    .ThenInclude(content => content.ShopItem)
                .FirstOrDefaultAsync(o => o.OrderId == id);
        }

        public async Task Update(Order order)
        {
            _context.Entry<Order>(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
