using ShopBackend.Domain.Entities;

namespace ShopBackend.Models
{
    public class AuthResponse
    {
        public AuthResponse(bool IsCorrect, User? user)
        {
            this.IsCorrect = IsCorrect;
            this.User = user;
        }
        bool IsCorrect { get; set; }
        User? User { get; set; } 
    }
}
