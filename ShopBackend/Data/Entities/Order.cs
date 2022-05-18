using System.ComponentModel.DataAnnotations;

namespace ShopBackend.Data.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime CreatedDate { get; set; }
        public ICollection<OrderContent> Items { get; set; }
        public Order()
        {
            Items = new List<OrderContent>();
        }
    }
}
