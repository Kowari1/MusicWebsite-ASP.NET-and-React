using MusicWebsiteReact.Models;

namespace MusicWebsiteReact.Data.IRepositories
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        ITrackRepository TrackRepository { get; }
        IPlaylistRepository PlaylistRepository { get; }
        IPlaylistTrackRepository PlaylistTrackRepository { get; }

        Task SaveAsync();
    }
}
