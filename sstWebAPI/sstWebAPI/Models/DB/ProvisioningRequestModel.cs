namespace sstWebAPI.Models.DB
{
    public class ProvisioningRequestModel
    {
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

        /// <summary>
        /// answer of management for this request
        /// </summary>
        public string answer { get; set; }

        /// <summary>
        /// state of this request (pending or declined)
        /// </summary>
        public string state { get; set; }

        #endregion
    }
}
