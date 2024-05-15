namespace sstWebAPI.Models.DTO.AuthenticationUser
{
    public class EditRegistrationApplicationModel
    {
        #region properties

        public Guid ID { get; set; }

        public bool AcceptOrDecline { get; set; }

        public string? EditRole { get; set; } = null;

        #endregion
    }
}
