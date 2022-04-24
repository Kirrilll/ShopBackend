using ShopBackend.Domain.Entities;
using ShopBackend.Models;

namespace ShopBackend.Domain.Repositories
{
    public interface IUserRepository
    {
        Task <User?> Registration(User user); //null если такое имя существует
        Task <User?> DeleteUser(AuthorizationRequest user); //null если нет такого user
        User? Auth(AuthorizationRequest user); //null если не прошел аунтификацию
        Task<User?> IsAdmin(AuthorizationRequest user); //null если не является админом
        User? GetById(int id); //null если нет
        Task Update(User user);
        Task<IEnumerable<User>> GetAll();

    }
}
