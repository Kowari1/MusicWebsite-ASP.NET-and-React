using AutoMapper;
using MusicWebsiteReact.DTO;
using MusicWebsiteReact.Models;

namespace MusicWebsiteReact.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDTO>();
            CreateMap<Track, TrackDTO>();
            CreateMap<Playlist, PlaylistDTO>();
            CreateMap<User, UserLoginDTO>();
            CreateMap<User, UserRegisterDTO>();
        }
    }
}