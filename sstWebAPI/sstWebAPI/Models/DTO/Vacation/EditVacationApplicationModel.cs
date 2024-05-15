namespace sstWebAPI.Models.DTO.Vacation
{
    public class EditVacationApplicationModel
    {
        #region properties

        /// <summary>
        /// ID of application which is being processed
        /// </summary>
        public Guid application_id { get; set; }

        /// <summary>
        /// new state of application
        /// </summary>
        public string state { get; set; }

        /// <summary>
        /// reason for this application being accepted/declined
        /// </summary>
        public string reason { get; set; }

        #endregion
    }
}
