using ShopBackend.Domain.Entities;
using ShopBackend.Models;

namespace ShopBackend.Domain.Repositories
{
    public interface IUserRepository
    {
        Task <User?> Registration(User user); //null если такое имя существует
        Task <User?> DeleteUser(AuthorizationRequest user); //null если нет такого user
        Task<User?> IsAuth(AuthorizationRequest user); //null если не прошел аунтификацию
        Task<User?> IsAdmin(AuthorizationRequest user); //null если не является админом
    }
}
