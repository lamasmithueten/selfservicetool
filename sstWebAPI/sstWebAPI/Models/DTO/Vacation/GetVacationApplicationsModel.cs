using sstWebAPI.Models.DB;

namespace sstWebAPI.Models.DTO.Vacation
{
    public class GetVacationApplicationsModel
    {
        #region constructors

        public GetVacationApplicationsModel(List<VactionApplicationWithUserModel> pending, List<VactionApplicationWithUserModel> accepted, List<VactionApplicationWithUserModel> declined) 
        {
            pending_applications = pending;
            accepted_applications = accepted;
            declined_applications = declined;
        }

        #endregion

        #region properties

        /// <summary>
        /// List of pending applications
        /// </summary>
        public List<VactionApplicationWithUserModel> pending_applications { get; set; }

        /// <summary>
        /// List of accepted applications
        /// </summary>
        public List<VactionApplicationWithUserModel> accepted_applications { get; set; }

        /// <summary>
        /// List of declined applications
        /// </summary>
        public List<VactionApplicationWithUserModel> declined_applications { get; set; }

        #endregion
    }
}
