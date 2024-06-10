using System.Text.RegularExpressions;

namespace sstWebAPI.Helpers
{
    public static class ValidateHelper
    {
        

        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return false;
            }
            var emailRegex = new Regex(@"^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$");
            return emailRegex.IsMatch(email);
        }
    }
}
