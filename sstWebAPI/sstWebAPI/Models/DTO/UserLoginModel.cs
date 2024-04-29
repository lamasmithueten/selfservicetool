namespace sstWebAPI.Models.DTO
{
    public class UserLoginModel
    {
        /// <summary>
        /// username/email of user for login
        /// </summary>
        public string usernameOrEmail { get; set; } = string.Empty;

        /// <summary>
        /// password of user for login
        /// </summary>
        public string password { get; set; } = string.Empty;
    }
}
