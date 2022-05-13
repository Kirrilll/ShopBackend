using Microsoft.EntityFrameworkCore;
using ShopBackend.Domain.Entities;
using ShopBackend.Models;

namespace ShopBackend.Domain.Repositories
{
    public class ShopRepository: IShopRepository
    {
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ShopRepository(ShopContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;  
        }
        public async Task<ShopItem>? Create(ShopItemRequest item)
        {
            string directoryPath = Path.Combine(_webHostEnvironment.WebRootPath, "images");
            string absoluteFilePath = Path.Combine(directoryPath, item.Image.FileName);
            string relativeFilePath = "images/" + item.Image.FileName;
            using(var fileStream = new FileStream(absoluteFilePath, FileMode.Create))
            {
                item.Image.CopyTo(fileStream);
            }

            var shopItem = new ShopItem()
            {
                ShopItemId = 0,
                Name = item.Name,
                Price = item.Price,
                Count = item.Count,
                LogoPath = relativeFilePath
            };
     
            _context.items.Add(shopItem);
            await _context.SaveChangesAsync();
            return shopItem;
        }

        public async Task<ShopItem?> Delete(int id)
        {
            var item = await _context.items.FindAsync(id);
            if(item == null) return null;
            _context.items.Remove(item);
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

        public async Task Update(ShopItem item)
        {
           _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
