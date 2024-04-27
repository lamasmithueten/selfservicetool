namespace sstWebAPI.Models
{
    public class UserLoginModel
    {
        /// <summary>
        /// username of user for login
        /// </summary>
        public string? username { get; set; } = null;

        /// <summary>
        /// password of user for login
        /// </summary>
        public string? password { get; set; } = null;
    }
}
