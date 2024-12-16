using System.ComponentModel.DataAnnotations;

namespace MusicWebsiteReact.DTO
{
    public class UserRegisterDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Nickname { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public IFormFile ProfileImage { get; set; }
    }
}
