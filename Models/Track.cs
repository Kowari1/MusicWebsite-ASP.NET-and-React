using MusicWebsiteReact.Enums;

namespace MusicWebsiteReact.Models
{
    public class Track
    {
        public Track() { }

        public Track(string title, string artist, Genre genre, DateTime releaseDate, string audioFileUrl, string coverFileUrl, TimeSpan duration = default)
        {
            Title = title;
            Artist = artist;
            Genre = genre;
            ReleaseDate = releaseDate;
            AudioFileUrl = audioFileUrl;
            CoverFileUrl = coverFileUrl;
            Duration = duration;
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Artist { get; set; }
        public Genre Genre { get; set; }
        public DateTime ReleaseDate { get; set; }
        public TimeSpan Duration { get; set; }
        public string AudioFileUrl { get; set; }
        public string CoverFileUrl { get; set; }

        public ICollection<Playlist> Playlists { get; set; }
    }
}
