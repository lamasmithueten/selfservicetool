namespace sstWebAPI.Models.DTO.Provisioning
{
    public class ProvisioningDeclinedWithUserModel
    {
        #region constructors

        public ProvisioningDeclinedWithUserModel() { }

        public ProvisioningDeclinedWithUserModel(Guid id, Guid userId, string virtualEnvironment, string purpose, string answer, string firstName, string lastName)
        {
            ID = id;
            ID_user = userId;
            virtual_environment = virtualEnvironment;
            this.purpose = purpose;
            this.answer = answer;
            this.first_name = firstName;
            this.last_name = lastName;
        }

        #endregion

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
