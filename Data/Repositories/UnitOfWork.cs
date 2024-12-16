
using MusicWebsiteReact.Data.IRepositories;

namespace MusicWebsiteReact.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext db;

        public IUserRepository UserRepository { get; private set; }
        public ITrackRepository TrackRepository { get; private set; }
        public IPlaylistRepository PlaylistRepository { get; private set; }

        public UnitOfWork(ApplicationDbContext db)
        {
            this.db = db;
            UserRepository = new UserRepository(db);
            TrackRepository = new TrackRepository(db);
            PlaylistRepository = new PlaylistRepository(db);
        }

        public async Task SaveAsync()
        {
            await db.SaveChangesAsync();
        }
    }
}
