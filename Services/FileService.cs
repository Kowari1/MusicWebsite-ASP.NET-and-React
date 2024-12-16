using Microsoft.Extensions.Options;
using MusicWebsiteReact.Configurations;

namespace MusicWebsiteReact.Services
{
    public enum StorageType
    {
        ProfileImage,
        Audio,
        Cover
    }

    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _env;
        private readonly FileStorageOptions _options;
        private readonly ILogger<FileService> _logger;

        private static readonly Dictionary<StorageType, string[]> ValidExtensions = new()
        {
            { StorageType.ProfileImage, new[] { ".jpg", ".jpeg", ".png" } },
            { StorageType.Audio, new[] { ".mp3", ".wav" } },
            { StorageType.Cover, new[] { ".jpg", ".jpeg", ".png" } }
        };

        public FileService(
            IWebHostEnvironment env,
            IOptions<FileStorageOptions> options,
            ILogger<FileService> logger)
        {
            _env = env;
            _options = options.Value;
            _logger = logger;
        }

        public async Task<string> SaveFileAsync(IFormFile file, StorageType storageType)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentNullException("Файл пустой или не предоставлен.");

            if (!IsValidFile(file, storageType))
                throw new ArgumentException($"Файл имеет недопустимый формат для типа {storageType}.");

            var folder = GetFolderByStorageType(storageType);
            var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

            var fullPath = Path.Combine(_env.ContentRootPath, _options.RootPath, folder, uniqueFileName);

            try
            {
                Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при сохранении файла.");
                throw;
            }

            return Path.Combine(folder, uniqueFileName).Replace("\\", "/");
        }

        public async Task<bool> DeleteFileAsync(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
                throw new ArgumentException("Путь к файлу не предоставлен.");

            var fullPath = Path.Combine(_env.ContentRootPath, _options.RootPath, filePath);

            if (!File.Exists(fullPath))
                return false;

            try
            {
                await Task.Run(() => File.Delete(fullPath));
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при удалении файла.");
                return false;
            }
        }

        public async Task<string> ReplaceFileAsync(string existingFilePath, IFormFile newFile, StorageType storageType)
        {
            if (!string.IsNullOrEmpty(existingFilePath))
            {
                await DeleteFileAsync(existingFilePath);
            }
            return await SaveFileAsync(newFile, storageType);
        }

        private bool IsValidFile(IFormFile file, StorageType storageType)
        {
            var extension = Path.GetExtension(file.FileName).ToLower();
            return ValidExtensions.ContainsKey(storageType) && ValidExtensions[storageType].Contains(extension);
        }

        private string GetFolderByStorageType(StorageType storageType)
        {
            return storageType switch
            {
                StorageType.ProfileImage => _options.ProfileImageFolder,
                StorageType.Audio => _options.AudioFolder,
                StorageType.Cover => _options.CoverFolder,
                _ => throw new ArgumentException("Неизвестный тип хранилища.")
            };
        }
    }
}