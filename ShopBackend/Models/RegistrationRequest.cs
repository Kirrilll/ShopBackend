using ShopBackend.Domain.Entities;

namespace ShopBackend.Models
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
                Name = this.Name,
                Surname = this.Surname,
                Phone = this.Phone,
                Email = this.Email,
                Password = this.Password,
                Patronymic = this.Patronymic,
                IsAdmin = false,

            };
        }
    }
}
