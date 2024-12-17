﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicWebsiteReact.Data;
using MusicWebsiteReact.Data.IRepositories;
using MusicWebsiteReact.Data.Repositories;
using MusicWebsiteReact.DTO;
using MusicWebsiteReact.Enums;
using MusicWebsiteReact.Models;
using MusicWebsiteReact.Services;
using System.Diagnostics;

namespace MusicWebsiteReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrackController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileService _fileService;
        private readonly ApplicationDbContext _db;

        public TrackController(IUnitOfWork unitOfWork, IFileService fileService, ApplicationDbContext db)
        {
            _unitOfWork = unitOfWork;
            _fileService = fileService;
            _db = db;

        }

        [HttpGet("genres")]
        public IActionResult GetGenres()
        {
            var genres = Enum.GetValues(typeof(Genre))
                             .Cast<Genre>()
                             .Select(g => new { Id = (int)g, Name = g.ToString() })
                             .ToList();

            return Ok(genres);
        }

        [HttpGet]
        public async Task<IActionResult> GetTracks([FromQuery] Genre? genre, [FromQuery] string? artist, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var query = _unitOfWork.TrackRepository.GetAllAsQueryable();

            if (genre != null)
            {
                query = query.Where(t => t.Genre == genre);
            }

            if (!string.IsNullOrEmpty(artist))
            {
                query = query.Where(t => t.Artist.Contains(artist));
            }

            var totalCount = await query.CountAsync();
            var tracks = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                Tracks = tracks
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateTrack([FromForm] TrackDTO dto)
        {
            string audioFilePath;
            string coverFilePath;

            try
            {
                audioFilePath = await _fileService.SaveFileAsync(dto.AudioFile, StorageType.Audio);
                coverFilePath = await _fileService.SaveFileAsync(dto.CoverFile, StorageType.Cover);
            }
            catch (Exception ex)
            {
                return BadRequest($"File saving error: {ex.Message}");
            }

            var track = new Track
            {
                Title = dto.Title,
                Artist = dto.Artist,
                Genre = dto.Genre,
                ReleaseDate = dto.ReleaseDate,
                Duration = dto.Duration,
                AudioFileUrl = audioFilePath,
                CoverFileUrl = coverFilePath
            };

            _unitOfWork.TrackRepository.AddAsync(track);
            await _unitOfWork.SaveAsync();

            return Ok(track);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrack(int id, [FromForm] TrackDTO dto)
        {
            var track = await _unitOfWork.TrackRepository.GetByIdAsync(id);
            if (track == null)
            {
                return NotFound("Track not found.");
            }

            if (!string.IsNullOrEmpty(dto.Title))
                track.Title = dto.Title;

            if (!string.IsNullOrEmpty(dto.Artist))
                track.Artist = dto.Artist;

            track.Genre = dto.Genre;
            track.ReleaseDate = dto.ReleaseDate;
            track.Duration = dto.Duration;

            if (dto.AudioFile != null)
            {
                try
                {
                    track.AudioFileUrl = await _fileService.ReplaceFileAsync(track.AudioFileUrl, dto.AudioFile, StorageType.Audio);
                }
                catch (Exception ex)
                {
                    return BadRequest($"Audio file update error: {ex.Message}");
                }
            }

            if (dto.CoverFile != null)
            {
                try
                {
                    track.CoverFileUrl = await _fileService.ReplaceFileAsync(track.CoverFileUrl, dto.CoverFile, StorageType.Cover);
                }
                catch (Exception ex)
                {
                    return BadRequest($"Cover file update error: {ex.Message}");
                }
            }

            _unitOfWork.TrackRepository.UpdateAsync(track);

            return Ok(track);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrack(int id)
        {
            var track = await _unitOfWork.TrackRepository.GetByIdAsync(id);
            if (track == null)
            {
                return NotFound("Track not found.");
            }

            try
            {
                if (!string.IsNullOrEmpty(track.AudioFileUrl))
                {
                    await _fileService.DeleteFileAsync(track.AudioFileUrl);
                }

                if (!string.IsNullOrEmpty(track.CoverFileUrl))
                {
                    await _fileService.DeleteFileAsync(track.CoverFileUrl);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"File deletion error: {ex.Message}");
            }

            _unitOfWork.TrackRepository.DeleteAsync(track);
            await _unitOfWork.SaveAsync();

            return Ok("Track deleted successfully.");
        }
    }
}

