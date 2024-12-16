
using System.ComponentModel.DataAnnotations;

namespace MusicWebsiteReact.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Имя обязателено")]
        [StringLength(12, MinimumLength = 3, ErrorMessage = "Имя должено содержать минимум 3 символа")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Email обязателен")]
        [EmailAddress(ErrorMessage = "Некорректный формат email")]
        public string Email { get; set; }
        public string Role { get; set; }
        
        public ICollection<PlaylistDTO>? Playlists { get; set; }
    }
}
