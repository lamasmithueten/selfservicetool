namespace sstWebAPI.Models.DTO
{
    public class EditRegistrationApplicationModel
    {
        #region properties

        public Guid ID { get; set; }

        public Boolean AcceptOrDecline { get; set; }

        public String? EditRole { get; set; } = null;

        #endregion
    }
}
