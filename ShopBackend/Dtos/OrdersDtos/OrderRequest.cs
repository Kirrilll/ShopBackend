

namespace ShopBackend.Dtos.OrdersDtos
{
    public class OrderRequest
    {
        public int UserId { get; set; }
        public List<int> ShopItemsId { get; set; }
    }
}
