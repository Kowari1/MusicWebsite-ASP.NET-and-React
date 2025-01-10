using System.ComponentModel.DataAnnotations;

namespace MusicWebsiteReact.DTO
{
    public class UserRegisterDTO
    {
 
        public string Email { get; set; }

        public string Password { get; set; }

        public string Nickname { get; set; }

        public IFormFile ProfileImage { get; set; }
    }
}
