namespace sstWebAPI.Models.DTO.Password
{
    public class ChangePasswordModel
    {
        public ChangePasswordModel(string reset_token, string newPassword)
        {
            this.reset_token = reset_token;
            this.newPassword = newPassword;
        }


        #region properties

        public string reset_token {  get; set; }

        public string newPassword {  get; set; }

        #endregion
    }
}
