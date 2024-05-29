namespace sstWebAPI.Models.DTO.Provisioning
{
    public class ProvisioningRequestModelWithUserModel
    {
        public ProvisioningRequestModelWithUserModel() { }

        public ProvisioningRequestModelWithUserModel(Guid id, Guid userId, string virtualEnvironment, string purpose, string firstName, string lastName)
        {
            ID = id;
            ID_user = userId;
            virtual_environment = virtualEnvironment;
            this.purpose = purpose;
            this.first_name = firstName;
            this.last_name = lastName;
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

        /// <summary>
        /// first name of user to use this environemnt
        /// </summary>
        public string first_name { get; set; }

        /// <summary>
        /// last name of user to use this environemnt
        /// </summary>
        public string last_name { get; set; }

        #endregion
    }
}
