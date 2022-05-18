

using ShopBackend.Data.Entities;

namespace ShopBackend.Dtos.UserDtos
{
    public class RegistrationRequest
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public User BuildUser()
        {
            return new User()
            {
                UserId = 0,
                Name = Name,
                Surname = Surname,
                Phone = Phone,
                Email = Email,
                Password = Password,
                Patronymic = Patronymic,
                IsAdmin = false,

            };
        }
    }
}
