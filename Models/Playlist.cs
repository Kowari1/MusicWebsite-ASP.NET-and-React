namespace MusicWebsiteReact.Models
{
    public class Playlist
    {
        public Playlist(string name, DateTime сreatedAt)
        {
            Name = name;
            CreatedAt = сreatedAt;
        }

        public Playlist() { }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<PlaylistTrack> PlaylistTracks { get; set; } = new List<PlaylistTrack>();
    }
}
