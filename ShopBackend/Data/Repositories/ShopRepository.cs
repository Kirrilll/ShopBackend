using Microsoft.EntityFrameworkCore;
using ShopBackend.Data.Entities;
using ShopBackend.Dtos.ItemDtos;

namespace ShopBackend.Data.Repositories
{
    public class ShopRepository : IShopRepository
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
            using (var fileStream = new FileStream(absoluteFilePath, FileMode.Create))
            {
                item.Image.CopyTo(fileStream);
            }

            var shopItem = new ShopItem()
            {
                ShopItemId = 0,
                Name = item.Name,
                Price = item.Price,
                Count = item.Count,
                LogoPath = relativeFilePath,
                IsDeleted = false,
            };

            _context.items.Add(shopItem);
            await _context.SaveChangesAsync();
            return shopItem;
        }

        public async Task<ShopItem?> Delete(int id)
        {
            var item = await _context.items.FindAsync(id);
            item.IsDeleted = true;
            if (item == null) return null;
            File.Delete(Path.Combine(_webHostEnvironment.WebRootPath, item.LogoPath));
            _context.Entry(item).State = EntityState.Modified; ;
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

        public async Task Update(ShopItemRequest item, int id)
        {
            var updatedItem = _context.items.Find(id);
            if (updatedItem == null) return;
            updatedItem.Price = item.Price;
            updatedItem.Count = item.Count;
            updatedItem.Name = item.Name;


            if (item.Image != null)
            {
                string directoryPath = Path.Combine(_webHostEnvironment.WebRootPath, "images");
                string absoluteFilePath = Path.Combine(directoryPath, item.Image.FileName);
                string relativeFilePath = "images/" + item.Image.FileName;

                if (!updatedItem.LogoPath.Equals(relativeFilePath))
                {
                    using (var fileStream = new FileStream(absoluteFilePath, FileMode.Create))
                    {
                        item.Image.CopyTo(fileStream);
                    }
                    File.Delete(Path.Combine(_webHostEnvironment.WebRootPath, updatedItem.LogoPath));
                    updatedItem.LogoPath = relativeFilePath;
                }
            }
            _context.Entry(updatedItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
