﻿using Microsoft.EntityFrameworkCore;
using ShopBackend.Domain.Entities;

namespace ShopBackend.Domain
{
    public class ShopRepository: IShopRepository
    {
        private readonly ShopContext _context;
        public ShopRepository(ShopContext context)
        {
            _context = context;
        }

        public async Task<ShopItem>? Create(ShopItem item)
        {
            if(item == null)
            {
                return null;
            }
            _context.items.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<IEnumerable<ShopItem>> GetAll()
        {
            return await _context.items.ToListAsync();
        }

        public async Task<ShopItem?> GetById(int id)
        {
            return await _context.items.FindAsync(id);  
        }

        public Task<ShopItem> Update(ShopItem item)
        {
            throw new NotImplementedException();
        }
    }
}
