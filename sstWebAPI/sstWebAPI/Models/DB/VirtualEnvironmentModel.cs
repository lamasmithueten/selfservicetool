namespace sstWebAPI.Models.DB
{
    public class VirtualEnvironmentModel
    {
        #region constructors

        public VirtualEnvironmentModel() { }

        public VirtualEnvironmentModel(Guid id, Guid userID, string virtualEnvironment, string answer, string ipAdresse, string username, string password) 
        {
            this.ID = id;
            this.ID_user = userID;
            this.virtual_environment = virtualEnvironment;
            this.answer = answer;
            this.username = username;
            this.password = password;
            this.IP_address = ipAdresse;
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
        /// answer of management for this request
        /// </summary>
        public string answer { get; set; }

        /// <summary>
        /// IP adress of virtual environment
        /// </summary>
        public string IP_address { get; set; }

        /// <summary>
        /// username for authentication to use this environemnt
        /// </summary>
        public string username { get; set; }

        /// <summary>
        /// password for authentication to use this environemnt
        /// </summary>
        public string password { get; set; }

        #endregion
    }
}
