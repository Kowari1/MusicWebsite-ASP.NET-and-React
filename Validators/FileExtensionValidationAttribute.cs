using System.ComponentModel.DataAnnotations;

namespace MusicWebsite.Server.Validators
{
    public class FileExtensionValidationAttribute : ValidationAttribute
    {
        private readonly string[] _validationExtension;

        public FileExtensionValidationAttribute(string[] validationExtension)
        {
            _validationExtension = validationExtension;
        }

        public override bool IsValid(object value) {
            if(value == null || string.IsNullOrEmpty(value.ToString()))
                return true;
            string fileExtension = System.IO.Path.GetExtension(value.ToString()).TrimStart('.').ToLower();
            return _validationExtension.Contains(fileExtension);
        }    
    }
}
