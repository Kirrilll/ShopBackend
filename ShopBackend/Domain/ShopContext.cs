using Microsoft.EntityFrameworkCore;
using ShopBackend.Domain.Entities;

namespace ShopBackend.Domain
{
    public class ShopContext: DbContext
    {
        public DbSet<ShopItem> items { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Order> orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany<Order>(user => user.Orders)
                .WithOne(order => order.User)
                .HasForeignKey(order => order.UserId);

            base.OnModelCreating(modelBuilder);
        }

        public ShopContext(DbContextOptions<ShopContext> options): base(options)
        {
            Database.EnsureCreated();
        }

    }
}
