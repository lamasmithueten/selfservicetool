using sstWebAPI.Models.DB;

namespace sstWebAPI.Models.DTO.Vacation
{
    public class GetVacationApplicationsModel
    {
        #region constructors

        public GetVacationApplicationsModel(List<VacationApplicationModel> pending, List<VacationApplicationModel> accepted, List<VacationApplicationModel> declined) 
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
        public List<VacationApplicationModel> pending_applications { get; set; }

        /// <summary>
        /// List of accepted applications
        /// </summary>
        public List<VacationApplicationModel> accepted_applications { get; set; }

        /// <summary>
        /// List of declined applications
        /// </summary>
        public List<VacationApplicationModel> declined_applications { get; set; }

        #endregion
    }
}
