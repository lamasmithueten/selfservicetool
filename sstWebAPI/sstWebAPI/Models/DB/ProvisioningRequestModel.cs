namespace sstWebAPI.Models.DB
{

    public class ProvisioningRequestModel
    {
        public ProvisioningRequestModel() { }

        public ProvisioningRequestModel(Guid id, Guid userId, string virtualEnvironment, string purpose)
        {
            ID = id;
            ID_user = userId;
            this.virtual_environment = virtualEnvironment;
            this.purpose = purpose;
        }

        #region properties

        /// <summary>
        /// ID of entry
        /// </summary>
        public Guid ID { get; set; }

        /// <summary>
        /// ID of user
        /// </summary>
        public Guid ID_user { get; set; }

        /// <summary>
        /// virtual environment type
        /// </summary>
        public string virtual_environment { get; set; }

        /// <summary>
        /// purpose of virtual environment
        /// </summary>
        public string purpose { get; set; }

        #endregion
    }
}
