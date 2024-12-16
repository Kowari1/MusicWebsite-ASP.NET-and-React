namespace MusicWebsiteReact.Data.IRepositories
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        ITrackRepository TrackRepository { get; }
        IPlaylistRepository PlaylistRepository { get; }

        Task SaveAsync();
    }
}
