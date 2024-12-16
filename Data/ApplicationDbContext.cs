using Microsoft.EntityFrameworkCore;
using MusicWebsiteReact.Models;

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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Пример конфигурации связей
            builder.Entity<Playlist>()
                .HasOne(p => p.User)
                .WithMany(u => u.Playlists)
                .HasForeignKey(p => p.UserId);

            builder.Entity<Playlist>()
                .HasMany(p => p.Tracks)
                .WithMany(t => t.Playlists);
        }
    }
}
