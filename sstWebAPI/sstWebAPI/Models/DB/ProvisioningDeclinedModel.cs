namespace sstWebAPI.Models.DB
{
    public class ProvisioningDeclinedModel
    {
        #region constructors

        public ProvisioningDeclinedModel() { } 

        public ProvisioningDeclinedModel(Guid id, Guid userId, string virtualEnvironment, string purpose, string answer) 
        { 
            ID = id;
            ID_user = userId;
            virtual_environment = virtualEnvironment;
            this.purpose = purpose;
            this.answer = answer;
            this.answer = answer;
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

        #endregion
    }
}
