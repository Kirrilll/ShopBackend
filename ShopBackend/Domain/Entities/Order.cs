using System.ComponentModel.DataAnnotations;

namespace ShopBackend.Domain.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime CreatedDate { get; set; }
        public ICollection<ShopItem> Items { get; set; }
        public Order()
        {
            this.Items = new HashSet<ShopItem>();
        }
    }
}
