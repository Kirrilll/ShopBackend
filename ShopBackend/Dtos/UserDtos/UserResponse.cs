

using ShopBackend.Data.Entities;

namespace ShopBackend.Dtos.UserDtos
{
    public class UserResponse
    {
        public int Id { get; set; }
        public bool IsAdmin { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public UserResponse(User user)
        {
            Id = user.UserId;
            IsAdmin = user.IsAdmin;
            Name = user.Name;
            Surname = user.Surname;
            Phone = user.Phone;
            Email = user.Email;
            Patronymic = user.Patronymic;
        }

    }
}
