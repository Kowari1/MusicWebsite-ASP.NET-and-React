using MusicWebsiteReact.Models;

namespace MusicWebsiteReact.Data.IRepositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetByEmailAsync(string Email);
        Task<bool> UserExistsAsync(string Email);
    }
}
