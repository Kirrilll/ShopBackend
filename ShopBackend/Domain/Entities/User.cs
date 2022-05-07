﻿
namespace ShopBackend.Domain.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
        public ICollection<Order> Orders { get; set; }

        public User()
        {
            this.Orders = new HashSet<Order>();
        }
    }
}
