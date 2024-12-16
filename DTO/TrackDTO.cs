using MusicWebsiteReact.Enums;
using System.ComponentModel.DataAnnotations;

namespace MusicWebsiteReact.DTO
{
    public class TrackDTO
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Artist { get; set; }
        [Required]
        public Genre Genre { get; set; }
        [Required]
        public DateTime ReleaseDate { get; set; }
        [Required]
        public TimeSpan Duration { get; set; }
        [Required]
        public IFormFile AudioFile { get; set; }
        [Required]
        public IFormFile CoverFile { get; set; }
    }
}
