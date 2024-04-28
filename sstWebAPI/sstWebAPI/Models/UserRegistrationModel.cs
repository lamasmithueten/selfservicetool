using System.Text.RegularExpressions;

namespace sstWebAPI.Models
{
    public class UserRegistrationModel
    {
        #region properties

        /// <summary>
        /// email of user for registration
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// username of user for registration
        /// </summary>
        public string Username { get; set; } = string.Empty;

        /// <summary>
        /// password of user for registration
        /// </summary>
        public string Password { get; set; } = string.Empty;

        /// <summary>
        /// firstname of user for registration
        /// </summary>
        public string Firstname { get; set; } = string.Empty;

        /// <summary>
        /// lastname of user for registration
        /// </summary>
        public string Lastname { get; set; } = string.Empty;

        /// <summary>
        /// username of user for registration
        /// </summary>
        public string Role { get; set; } = UserRoles.Employee;

        #endregion

        #region public funtions

        /// <summary>
        /// tells if the object is valid or not 
        /// </summary>
        /// <param name="alertMessage"></param>
        /// gives back an alert string which consists of parameters that have missing values to make the object valid
        /// <returns></returns>
        public bool IsValid(out string alertMessage)
        {
            //checks if this object is null
            if (this == null)
            {
                alertMessage = "UserRegistrationObject cannot be null.";
                return false;
            }

            //gets a collection of all parameters that are null or consists of just whitespaces
            var nullOrWhitespaceProperties = GetType()
                .GetProperties()
                .Where(property => string.IsNullOrWhiteSpace((string?)property.GetValue(this)))
                .Select(property => property.Name);

            //if this collection got at least one item the registration object isnt valid
            if (nullOrWhitespaceProperties.Any())
            {
                alertMessage = $"Please check following field/s: {string.Join(", ", nullOrWhitespaceProperties)}.";
                return false;
            }

            //checks if the email is a valid email
            if (!IsEmailValid(out string isEmailValidMessage))
            {
                alertMessage = isEmailValidMessage;
                return false;
            }

            //checks if the given role is valid
            string[] roles = [UserRoles.Admin, UserRoles.Management, UserRoles.Admin];
            if (!roles.Contains(Role))
            {
                alertMessage = "The role is not valid.";
                return false;
            }

            //all requirements met
            alertMessage = "";
            return true;
        }

        #endregion

        #region private helper functions

        /// <summary>
        /// checks if the email is valid
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        private bool IsEmailValid(out string alertMessage)
        {
            //check if the password is null or empty
            if (Email == null)
            {
                alertMessage = "The email cannot be null.";
                return false;
            }

            //regular expression pattern for validating email addresses
            string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

            //check if email matches the pattern
            if (!Regex.IsMatch(Email, pattern))
            {
                alertMessage = "The email is not an email.";
                return false;
            }

            //email meets all requirements
            alertMessage = "";
            return true;
        }

        #endregion
    }
}
