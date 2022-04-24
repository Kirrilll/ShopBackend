using Microsoft.EntityFrameworkCore;
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

        public async Task<User?> DeleteUser(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null) return null;
             _context.users.Remove(user);
            await _context.SaveChangesAsync();
            return user;

        }

        public async Task<User?> IsAdmin(AuthorizationRequest user)
        {
            var client = await _context.users.FindAsync(user.Login.ToLower());
            if (client == null) return null;
            if (client.IsAdmin) return client;
            return null;
        }

        public User? Auth(AuthorizationRequest user)
        {
            var client = _context.users.FirstOrDefault<User>((client) => client.Login.Equals(user.Login));
            if(client == null) return null;
            if (client.Password.Equals(user.Password)) return client;
            return null;
        }

        public async Task<User?> Registration(User user)
        {
            var duplicate = _context.users.FirstOrDefault<User>((client) => client.Login.Equals(user.Login));
            if(duplicate != null) return null;
            _context.users.Add(user);
            await  _context.SaveChangesAsync();
            return user;
        }

        public User? GetById(int id)
        {
             return _context.users.FirstOrDefault<User>(user => user.Id == id);
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
