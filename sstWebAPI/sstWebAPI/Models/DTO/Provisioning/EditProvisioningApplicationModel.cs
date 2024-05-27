namespace sstWebAPI.Models.DTO.Provisioning
{
    public class EditProvisioningApplicationModel
    {
        #region properties

        public Guid ApplicationId { get; set; }
        public bool AcceptOrDecline {  get; set; }
        public string Answer {  get; set; }

        #endregion
    }
}
