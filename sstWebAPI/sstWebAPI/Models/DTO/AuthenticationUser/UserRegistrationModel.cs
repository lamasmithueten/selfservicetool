using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using sstWebAPI.Constants;

namespace sstWebAPI.Models.DTO.AuthenticationUser
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
            if (!IsEmailValid())
            {
                alertMessage = "The email is not valid.";
                return false;
            }

            //checks if the password is a valid password
            if (!IsPasswordValid())
            {
                alertMessage = "The password is not valid.";
                return false;
            }

            //checks if the given role is valid
            string[] roles = [UserRoles.Employee, UserRoles.Management, UserRoles.Admin];
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
        private bool IsEmailValid()
        {
            //check if the password is null or empty
            if (String.IsNullOrEmpty(Email))
            {
                return false;
            }

            //regular expression pattern for validating email addresses
            string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

            //check if email matches the pattern
            if (!Regex.IsMatch(Email, pattern))
            {
                return false;
            }

            //email meets all requirements
            return true;
        }
        public bool IsPasswordValid()
        {
            if (string.IsNullOrWhiteSpace(Password))
            {
                return false;
            }

            if (Password.Length < 8)
            {
                return false;
            }

            if (!Password.Any(char.IsUpper))
            {
                return false;
            }

            if (!Password.Any(char.IsLower))
            {
                return false;
            }

            if (!Password.Any(char.IsDigit))
            {
                return false;
            }

            return true;
        }

        #endregion
    }
}
