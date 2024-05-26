namespace sstWebAPI.Models.DB
{
    public class VirtualEnvironmentModel
    {
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
    }
}
