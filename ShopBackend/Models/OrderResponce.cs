using ShopBackend.Domain.Entities;

namespace ShopBackend.Models
{
    public class OrderResponce
    {
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<ShopItemResponce> Orders { get; set; }

        public OrderResponce(Order order)
        {
            UserId = order.UserId;
            CreatedAt = order.CreatedDate;
            Orders = order.Items.Select(item => new ShopItemResponce(item)).ToList();
        }
    }
}
