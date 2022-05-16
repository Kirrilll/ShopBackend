using ShopBackend.Domain.Entities;

namespace ShopBackend.Models
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public bool IsAdmin { get; set; }

        public UserResponse(User user)
        {
            Id = user.UserId;
            UserName = user.Login;
            IsAdmin = user.IsAdmin;
        }

    }
}
