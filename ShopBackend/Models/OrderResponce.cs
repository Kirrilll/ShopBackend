using ShopBackend.Domain.Entities;
using ShopBackend.Models.Orders;

namespace ShopBackend.Models
{
    public class OrderResponce
    {
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<OrderContentPart> OrderContents{ get; set; }

        public OrderResponce(Order order)
        {
            UserId = order.UserId;
            CreatedAt = order.CreatedDate;

            Dictionary<ShopItemInOrder, int> items = new Dictionary<ShopItemInOrder, int>();
            foreach(var item in order.Items)
            {
                var itemInOrder = new ShopItemInOrder(item.ShopItem);
                if(items.ContainsKey(itemInOrder)) items[itemInOrder]++;
                else items.Add(itemInOrder, 1);
            }

            OrderContents = OrderContentPart.BuildFromDictionary(items);
        }
    }
}
