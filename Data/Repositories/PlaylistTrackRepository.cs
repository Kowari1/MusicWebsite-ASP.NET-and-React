using MusicWebsiteReact.Data.IRepositories;
using MusicWebsiteReact.Models;

namespace MusicWebsiteReact.Data.Repositories
{
    public class PlaylistTrackRepository : Repository<PlaylistTrack>, IPlaylistTrackRepository
    {
        public PlaylistTrackRepository(ApplicationDbContext db) : base(db)
        {
        }
    }
}
