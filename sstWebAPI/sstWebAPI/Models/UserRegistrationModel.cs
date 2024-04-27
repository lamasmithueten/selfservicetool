using System.Text.RegularExpressions;

namespace sstWebAPI.Models
{
    public class UserRegistrationModel
    {
        #region properties

        /// <summary>
        /// email of user for registration
        /// </summary>
        public string? email { get; set; } = null;

        /// <summary>
        /// username of user for registration
        /// </summary>
        public string? username { get; set; } = null;

        /// <summary>
        /// password of user for registration
        /// </summary>
        public string? password { get; set; } = null;

        /// <summary>
        /// firstname of user for registration
        /// </summary>
        public string? firstname { get; set; } = null;

        /// <summary>
        /// lastname of user for registration
        /// </summary>
        public string? lastname { get; set; } = null;

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

            if (!IsEmailValid(out string isEmailValidMessage))
            {
                alertMessage = isEmailValidMessage;
                return false;
            }

            //if the password isnt valid the object isnt valid
            if (!IsPasswordValid(out string isPasswordValidMessage)) //TODO: Abklären wer das passwort hasht frontend / backend
            {
                alertMessage = isPasswordValidMessage;
                return false;
            }

            //all requirements met
            alertMessage = "";
            return true;
        }

        #endregion

        #region private helper functions

        /// <summary>
        /// checks if the passowrd of this object is valid
        /// </summary>
        /// <param name="alertMessage"></param>
        /// <returns></returns>
        private bool IsPasswordValid(out string alertMessage)
        {
            //check if the password is null or empty
            if (String.IsNullOrWhiteSpace(password))
            {
                alertMessage = "The password only contains whitespaces or is null";
                return false;
            }

            //check if the password length is at least 8 characters
            if (password.Length < 8)
            {
                alertMessage = "The password does not have the minimum of 8 characters";
                return false;
            }

            //check if the password contains at least one uppercase letter
            if (!password.Any(char.IsUpper))
            {
                alertMessage = "The password should contain at least one upper character";
                return false;
            }

            //check if the password contains at least one lowercase letter
            if (!password.Any(char.IsLower))
            {
                alertMessage = "The password should contain at least one lower character";
                return false;
            }

            //check if the password contains at least one digit
            if (!password.Any(char.IsDigit))
            {
                alertMessage = "The password should contain at least one digit";
                return false;
            }

            //check if the password contains at least one special character
            if (!password.Any(IsSpecialCharacter))
            {
                alertMessage = "The password should contain at least one special character";
                return false;
            }

            //all requirements met
            alertMessage = "";
            return true;
        }

        /// <summary>
        /// checks if a character is a special character
        /// </summary>
        /// <param name="c"></param>
        /// <returns></returns>
        private static bool IsSpecialCharacter(char c)
        {
            //define all special characters
            string specialCharacters = "!@#$%^&*()-_=+[{]}|;:'\",.?/";

            //check if the char is a special character
            return specialCharacters.Contains(c);
        }

        /// <summary>
        /// checks if the email is valid
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        private bool IsEmailValid(out string alertMessage)
        {
            //check if the password is null or empty
            if (email == null)
            {
                alertMessage = "The email cannot be null.";
                return false;
            }

            //regular expression pattern for validating email addresses
            string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

            //check if email matches the pattern
            if(!Regex.IsMatch(email, pattern))
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
