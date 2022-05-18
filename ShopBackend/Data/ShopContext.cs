using Microsoft.EntityFrameworkCore;
using ShopBackend.Data.Entities;
namespace ShopBackend.Data
{
    public class ShopContext : DbContext
    {
        public DbSet<ShopItem> items { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Order> orders { get; set; }

        //TODO исправить вывод значения, будто не выводятся =(
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>()
                .HasMany(user => user.Orders)
                .WithOne(order => order.User)
                .HasForeignKey(order => order.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderContent>()
                .HasKey(oc => oc.Id);

            modelBuilder.Entity<OrderContent>()
                .HasOne(order => order.Order)
                .WithMany(o => o.Items)
                .HasForeignKey(order => order.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<OrderContent>()
                .HasOne(item => item.ShopItem)
                .WithMany(i => i.Orders)
                .HasForeignKey(item => item.ShopItemId)
                .OnDelete(DeleteBehavior.Cascade);

        }

        public ShopContext(DbContextOptions<ShopContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

    }
}
