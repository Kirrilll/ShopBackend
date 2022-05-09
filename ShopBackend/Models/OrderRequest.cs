using ShopBackend.Domain.Entities;

namespace ShopBackend.Models
{
    public class OrderRequest
    {
        public int UserId { get; set; } 
        public List<int> ShopItemsId { get; set; }
    }
}
