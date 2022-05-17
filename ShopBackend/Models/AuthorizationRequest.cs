using ShopBackend.Domain.Entities;

namespace ShopBackend.Models
{
    public class AuthorizationRequest
    {
        public string Phone { get; set; }
        public string Password { get; set; }
    }
}
