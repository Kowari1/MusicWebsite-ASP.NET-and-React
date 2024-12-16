using MusicWebsiteReact.Data.IRepositories;
using MusicWebsiteReact.Models;

namespace MusicWebsiteReact.Data.Repositories
{
    internal class PlaylistRepository : Repository<Playlist>, IPlaylistRepository
    {
        private ApplicationDbContext _db;

        public PlaylistRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
    }
}
