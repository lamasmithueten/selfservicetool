namespace sstWebAPI.Models.DTO.Provisioning
{
    public class ProvisioningServiceResponseModel
    {
        public string id { get; set; }
        public string type { get; set; }
        public bool verificationSuccessful { get; set; }
        public string ipAddress { get; set; }
        public string userName { get; set; }
        public string initialPassword { get; set; }
    }
}
