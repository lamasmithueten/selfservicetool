namespace sstWebAPI.Models.DTO.Provisioning
{
    public class ProvisioningServiceRequestModel(string id, string type)
    {
        public string id { get; set; } = id;
        public string type { get; set; } = type;
    }
}
