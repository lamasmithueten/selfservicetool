namespace sstWebAPI.Models
{
    public class UserLoginModel
    {
        /// <summary>
        /// username/email of user for login
        /// </summary>
        public string usernameOrEmail { get; set; } = String.Empty;

        /// <summary>
        /// password of user for login
        /// </summary>
        public string password { get; set; } = String.Empty;
    }
}
