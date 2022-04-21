using Microsoft.EntityFrameworkCore;
using ShopBackend.Domain.Entities;

namespace ShopBackend.Domain
{
    public class ShopContext: DbContext
    {
        public DbSet<ShopItem> items { get; set; }
        public DbSet<User> users { get; set; }
        public ShopContext(DbContextOptions<ShopContext> options): base(options)
        {
            Database.EnsureCreated();
        }

    }
}
