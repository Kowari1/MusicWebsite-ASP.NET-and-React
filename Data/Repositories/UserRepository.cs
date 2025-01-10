using Microsoft.EntityFrameworkCore;
using MusicWebsiteReact.Data.IRepositories;
using MusicWebsiteReact.Models;

namespace MusicWebsiteReact.Data.Repositories
{
    internal class UserRepository : Repository<User>, IUserRepository
    {
        private ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<User> GetByEmailAsync(string Email)
        {
            return await _dbSet.FirstAsync(u => u.Email == Email);
        }

        public async Task<bool> UserExistsAsync(string Email)
        {
            return await _dbSet.AnyAsync(u => u.Email == Email);
        }
    }
}
