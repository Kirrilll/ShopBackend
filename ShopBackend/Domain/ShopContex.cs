using Microsoft.EntityFrameworkCore;
using ShopBackend.Models;

namespace ShopBackend
{
    public class ShopContex: DbContext
    {
        public DbSet<ShopItem>? items { get; set; }
        public ShopContex(DbContextOptions<ShopContex> options): base(options)
        {
            Database.EnsureCreated();
        }

    }
}
