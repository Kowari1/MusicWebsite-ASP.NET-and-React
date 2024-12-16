namespace MusicWebsiteReact.Services
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile file, StorageType storageType);
        Task<bool> DeleteFileAsync(string filePath);
        Task<string> ReplaceFileAsync(string existingFilePath, IFormFile newFile, StorageType storageType);
    }
}
