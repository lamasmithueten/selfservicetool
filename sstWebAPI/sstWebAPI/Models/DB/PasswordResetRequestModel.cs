using Microsoft.Extensions.Configuration.UserSecrets;

namespace sstWebAPI.Models.DB
{
    public class PasswordResetRequestModel
    {
        #region constructors

        public PasswordResetRequestModel() {}

        public PasswordResetRequestModel(Guid userId, string resetToken)
        {
            id = Guid.NewGuid();
            user_id = userId;
            reset_token = resetToken;
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

        #endregion
    }
}
