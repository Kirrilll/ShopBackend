using ShopBackend.Domain.Entities;

namespace ShopBackend.Models
{
    public class AuthorizationRequest
    {
        public string Login { get; set; }
        public string Password { get; set; }

        public User BuildUser(bool isAdmin = false)
        {
            var user = new User();
            user.Id = 0;
            user.Login = Login;
            user.Password = Password;
            user.IsAdmin = isAdmin;
            return user;
        }
    }
}
