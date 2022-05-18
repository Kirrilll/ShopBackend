using ShopBackend.Data.Entities;
using ShopBackend.Dtos.UserDtos;

namespace ShopBackend.Data.Repositories
{
    public interface IUserRepository
    {
        Task<User?> Registration(User user); //null если такое имя существует
        Task<User?> DeleteUser(int id); //null если нет такого user
        User? Auth(AuthorizationRequest user); //null если не прошел аунтификацию
        Task<User?> IsAdmin(int id); //null если не является админом
        User? GetById(int id); //null если нет
        Task Update(User user);
        Task<IEnumerable<User>> GetAll();

    }
}
