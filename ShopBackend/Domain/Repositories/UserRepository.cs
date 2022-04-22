using ShopBackend.Domain.Entities;
using ShopBackend.Models;

namespace ShopBackend.Domain.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly ShopContext _context;
        public UserRepository(ShopContext context)
        {
            _context = context;
        }

        public Task<User?> DeleteUser(AuthorizationRequest user)
        {
          throw new NotImplementedException();
        }

        public async Task<User?> IsAdmin(AuthorizationRequest user)
        {
            var client = await _context.users.FindAsync(user.Login.ToLower());
            if (client == null) return null;
            if (client.IsAdmin) return client;
            return null;
        }

        public async Task<User?> IsAuth(AuthorizationRequest user)
        {
            var client = await _context.users.FindAsync(user.Login);
            if(client == null) return null;
            if (client.Password.Equals(user.Password)) return client;
            return null;
        }

        public async Task<User?> Registration(User user)
        {
            _context.users.Add(user);
            await  _context.SaveChangesAsync();
            return user;
        }
    }
}
