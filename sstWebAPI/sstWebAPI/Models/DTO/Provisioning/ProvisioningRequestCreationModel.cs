namespace sstWebAPI.Models.DTO.Provisioning
{
    public class ProvisioningRequestCreationModel
    {
        /// <summary>
        /// virtual environment type
        /// </summary>
        public required string VirtualEnvironment { get; set; }

        /// <summary>
        /// purpose of virtual environment
        /// </summary>
        public required string Purpose { get; set; }
    }
}
