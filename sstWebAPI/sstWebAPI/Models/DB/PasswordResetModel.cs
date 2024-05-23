using Microsoft.Extensions.Configuration.UserSecrets;

namespace sstWebAPI.Models.DB
{
    public class PasswordResetModel
    {
        #region constructors

        public PasswordResetModel() {}

        public PasswordResetModel(Guid userId, string resetToken, DateTime time)
        {
            id = Guid.NewGuid();
            user_id = userId;
            reset_token = resetToken;
            expires = time;
        }

        #endregion

        #region properties

        /// <summary>
        /// id of entry
        /// </summary>
        public Guid id { get; set; }

        /// <summary>
        /// id of user
        /// </summary>
        public Guid user_id { get; set; }

        /// <summary>
        /// reset token
        /// </summary>
        public string reset_token { get; set; }

        /// <summary>
        /// Time when token expires
        /// </summary>
        public DateTime expires {  get; set; }

        #endregion
    }
}
