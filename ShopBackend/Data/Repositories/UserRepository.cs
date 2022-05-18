using Microsoft.EntityFrameworkCore;
using ShopBackend.Data.Entities;
using ShopBackend.Dtos.UserDtos;

namespace ShopBackend.Data.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly ShopContext _context;
        public UserRepository(ShopContext context)
        {
            _context = context;
        }

        public async Task<User?> DeleteUser(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null) return null;
            _context.users.Remove(user);
            await _context.SaveChangesAsync();
            return user;

        }

        public async Task<User?> IsAdmin(int id)
        {
            var client = await _context.users.FindAsync(id);
            if (client == null) return null;
            if (client.IsAdmin) return client;
            return null;
        }

        public User? Auth(AuthorizationRequest user)
        {
            var client = _context.users.FirstOrDefault<User>((client) => client.Phone.Equals(user.Phone));
            if (client == null) return null;
            if (client.Password.Equals(user.Password)) return client;
            return null;
        }

        public async Task<User?> Registration(User user)
        {
            var duplicate = _context.users.FirstOrDefault<User>((client) => client.Phone.Equals(user.Phone));
            if (duplicate != null) return null;
            _context.users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public User? GetById(int id)
        {
            return _context.users.FirstOrDefault<User>(user => user.UserId == id);
        }

        public async Task Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _context.users.ToListAsync();
        }
    }
}
