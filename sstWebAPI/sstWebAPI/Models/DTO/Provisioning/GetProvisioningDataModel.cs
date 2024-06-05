using sstWebAPI.Models.DB;

namespace sstWebAPI.Models.DTO.Provisioning
{
    public class GetProvisioningDataModel
    {
        #region constructors

        public GetProvisioningDataModel(List<ProvisioningRequestModelWithUserModel> pending, List<VirtualEnviromentWithUserModel> accepted, List<ProvisioningDeclinedWithUserModel> declined)
        {
            pending_applications = pending;
            accepted_applications = accepted;
            declined_applications = declined;
        }

        #endregion

        #region properties

        /// <summary>
        ///        /// List of pending applications
        ///               /// </summary>
                              public List<ProvisioningRequestModelWithUserModel> pending_applications { get; set; }
        ///                      
        /// <summary>
        ///        /// List of accepted applications
        ///               /// </summary>
                             public List<VirtualEnviromentWithUserModel> accepted_applications { get; set; }
        ///                      
        /// <summary>
        ///        /// List of declined applications
        ///               /// </summary>
                              public List<ProvisioningDeclinedWithUserModel> declined_applications { get; set; }
        ///                      
        #endregion
    }
}
