using Microsoft.EntityFrameworkCore;
using MusicWebsiteReact.Models;
using System.Reflection.Emit;

namespace MusicWebsiteReact.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<PlaylistTrack> PlaylistTracks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<PlaylistTrack>()
                .HasKey(pt => new { pt.PlaylistId, pt.TrackId });

            builder.Entity<PlaylistTrack>()
                .HasOne(pt => pt.Playlist)
                .WithMany(p => p.PlaylistTracks)
                .HasForeignKey(pt => pt.PlaylistId);

            builder.Entity<PlaylistTrack>()
                .HasOne(pt => pt.Track)
                .WithMany()
                .HasForeignKey(pt => pt.TrackId);
        }
    }
}
