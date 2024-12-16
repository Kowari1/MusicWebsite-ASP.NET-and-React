namespace MusicWebsiteReact.Models
{
    public class Playlist
    {
        public Playlist(string name, ICollection<Track>? tracks = null)
        {
            Name = name;
            Tracks = tracks;
        }

        public Playlist() { }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<Track>? Tracks { get; set; }
    }
}
