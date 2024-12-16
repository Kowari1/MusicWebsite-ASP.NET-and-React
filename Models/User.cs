using System.ComponentModel.DataAnnotations;

namespace MusicWebsiteReact.Models
{
    public class User
    {
        public User() { }

        public User(int Id, string name, string email, string password, string role, ICollection<Playlist> playlists = null)
        {
            Name = name;
            Email = email;
            Password = password;
            Role = role;
            Playlists = playlists;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string ProfileImage { get; set; }

        public ICollection<Playlist>? Playlists { get; set; }
    }
}
