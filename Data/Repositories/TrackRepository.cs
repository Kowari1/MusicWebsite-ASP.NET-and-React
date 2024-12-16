using Microsoft.EntityFrameworkCore;
using MusicWebsiteReact.Data.IRepositories;
using MusicWebsiteReact.Models;

namespace MusicWebsiteReact.Data.Repositories
{
    internal class TrackRepository : Repository<Track>, ITrackRepository
    {
        private ApplicationDbContext _db;

        public TrackRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public IQueryable<Track> GetAllAsQueryable()
        {
            return _db.Tracks.AsQueryable();
        }
    }
}
