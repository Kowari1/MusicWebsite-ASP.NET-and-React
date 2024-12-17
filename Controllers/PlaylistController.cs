using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicWebsiteReact.Data.IRepositories;
using MusicWebsiteReact.Models;
using System.Security.Claims;

namespace MusicWebsiteReact.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public PlaylistController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("{playlistId}/add-track")]
        public async Task<IActionResult> AddTrackToPlaylist(int playlistId, [FromBody] int trackId)
        {
            var playlist = await _unitOfWork.PlaylistRepository.GetByIdAsync(playlistId);
            if (playlist == null)
                return NotFound($"Playlist with ID {playlistId} not found.");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (playlist.UserId != int.Parse(userId))
                return Forbid();

            var track = await _unitOfWork.TrackRepository.GetByIdAsync(trackId);
            if (track == null)
                return NotFound($"Track with ID {trackId} not found.");

            if (playlist.PlaylistTracks.Any(pt => pt.TrackId == trackId))
                return BadRequest("Track already exists in the playlist.");

            playlist.PlaylistTracks.Add(new PlaylistTrack
            {
                PlaylistId = playlistId,
                TrackId = trackId
            });

            await _unitOfWork.SaveAsync();
            return Ok("Track successfully added to the playlist.");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlaylistById(int id)
        {
            var playlist = await _unitOfWork.PlaylistRepository.GetByIdAsync(id);
            if (playlist == null)
                return NotFound($"Playlist with ID {id} not found.");

            return Ok(playlist);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPlaylists()
        {
            var playlists = await _unitOfWork.PlaylistRepository.GetAllAsync();
            return Ok(playlists);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlaylist([FromBody] Playlist playlist)
        {
            if (playlist == null)
                return BadRequest("Playlist data is required.");

            await _unitOfWork.PlaylistRepository.AddAsync(playlist);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(GetPlaylistById), new { id = playlist.Id }, playlist);
        }

        [HttpDelete("{playlistId}/removeTrack/{trackId}")]
        public async Task<IActionResult> RemoveTrackFromPlaylist(int playlistId, int trackId)
        {
            var playlistTrack = await _unitOfWork.PlaylistTrackRepository.Get(pt => pt.PlaylistId == playlistId && pt.TrackId == trackId);

            if (playlistTrack == null)
            {
                return NotFound("Track not found in playlist.");
            }

            await _unitOfWork.PlaylistTrackRepository.DeleteAsync(playlistTrack);
            await _unitOfWork.SaveAsync();

            return Ok("Track removed from playlist.");
        }

        [HttpGet("user-playlists")]
        public async Task<IActionResult> GetUserPlaylists()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var playlists = await _unitOfWork.PlaylistRepository.GetListAsync(p => p.UserId == int.Parse(userId));
            return Ok(playlists.Select(p => new { p.Id, p.Name }));
        }
    }
}
