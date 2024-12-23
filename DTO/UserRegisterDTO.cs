﻿using System.ComponentModel.DataAnnotations;

namespace MusicWebsiteReact.DTO
{
    public class UserRegisterDTO
    {
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Nickname { get; set; }
        [Required, MinLength(6)]
        public string Password { get; set; }
        [Required]
        public IFormFile ProfileImage { get; set; }
    }
}
